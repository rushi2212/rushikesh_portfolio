const http = require("http");
const introVoice = require("./intro-voice");

const port = Number(process.env.ELEVENLABS_DEV_PORT) || 3001;

http
  .createServer((req, res) => {
    if (req.url.split("?")[0] !== "/api/intro-voice") {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }

    res.status = (statusCode) => {
      res.statusCode = statusCode;
      return res;
    };
    res.json = (body) => {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
      res.end(JSON.stringify(body));
      return res;
    };
    res.send = (body) => {
      res.end(body);
      return res;
    };

    Promise.resolve(introVoice(req, res)).catch(() => {
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end("Voice service is unavailable");
      }
    });
  })
  .listen(port, "127.0.0.1", () => {
    console.log(`Local ElevenLabs API ready at http://127.0.0.1:${port}`);
  });
