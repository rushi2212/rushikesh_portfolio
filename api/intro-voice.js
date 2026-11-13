const introductionText = require("../src/content/introduction.json");

module.exports = async function introVoice(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = "fPIfC3elMLbN9tNwMXkw";

  if (!apiKey) {
    return res.status(503).json({ error: "ElevenLabs is not configured" });
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
      return res.status(502).json({ error: "ElevenLabs could not create audio" });
    }

    const audio = Buffer.from(await response.arrayBuffer());
    res.setHeader("Content-Type", "audio/mpeg");
    res.setHeader("Content-Length", audio.length);
    res.setHeader("Content-Disposition", "inline; filename=introduction.mp3");
    res.setHeader("Cache-Control", "public, max-age=86400, s-maxage=86400");
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.status(200).send(audio);
  } catch {
    return res.status(502).json({ error: "Voice service is unavailable" });
  }
};
