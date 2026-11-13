const introductionText = require("../src/content/introduction.json");

module.exports = async function introVoice(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = "fPIfC3elMLbN9tNwMXkw";

  if (!apiKey) {
    console.error("ElevenLabs TTS is unavailable: ELEVENLABS_API_KEY is missing.");
    return res.status(503).json({
      error: "ELEVENLABS_API_KEY is missing from the Vercel environment.",
    });
  }

  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          Accept: "audio/mpeg",
        },
        body: JSON.stringify({
          text: introductionText,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.68,
            similarity_boost: 0.82,
            style: 0,
            use_speaker_boost: true,
            speed: 0.96,
          },
        }),
      },
    );

    if (!response.ok) {
      const body = await response.text();
      let providerError = {};
      try {
        providerError = JSON.parse(body)?.detail || {};
      } catch {
        providerError = {};
      }

      const errorCode = providerError.code || providerError.status || "unknown";
      const errorMessage = providerError.message || "No provider message returned.";
      console.error("ElevenLabs TTS request failed", {
        status: response.status,
        code: errorCode,
        message: errorMessage,
        requestId: providerError.request_id,
      });

      const userMessage = {
        400: "ElevenLabs rejected the text or voice settings. Check the Vercel function logs.",
        401: "ElevenLabs rejected the API key. Verify ELEVENLABS_API_KEY and redeploy.",
        402: "The ElevenLabs account needs available credits for text to speech.",
        403: "The API key may lack Text to Speech access or access to this voice.",
        404: "The voice ID was not found or is unavailable to this ElevenLabs account.",
        422: "ElevenLabs rejected the request parameters. Check the Vercel function logs.",
        429: "ElevenLabs rate or concurrency limit reached. Please try again shortly.",
      }[response.status] || "ElevenLabs returned an error. Check the Vercel function logs.";

      return res.status(502).json({
        error: userMessage,
        providerStatus: response.status,
        providerCode: errorCode,
      });
    }

    const audio = Buffer.from(await response.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", audio.length);
    res.setHeader("Content-Disposition", "inline; filename=introduction.mp3");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.status(200).send(audio);
  } catch (error) {
    console.error("ElevenLabs TTS network/runtime error", {
      name: error?.name,
      message: error?.message,
    });
    return res.status(502).json({ error: "Voice service is unavailable" });
  }
};
