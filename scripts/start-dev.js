const { spawn } = require("child_process");
const path = require("path");
const dotenv = require("dotenv");

// Load local server secrets in the same precedence order used by CRA.
[".env.development.local", ".env.development", ".env.local", ".env"].forEach(
  (file) => dotenv.config({ path: path.resolve(process.cwd(), file) }),
);

const apiServer = spawn(
  process.execPath,
  [path.resolve("api/dev-server.js")],
  { stdio: "inherit", env: process.env },
);
const reactServer = spawn(
  process.execPath,
  [require.resolve("react-scripts/scripts/start.js")],
  { stdio: "inherit", env: process.env },
);

let isStopping = false;
const stop = (exitCode = 0) => {
  if (isStopping) return;
  isStopping = true;
  if (!apiServer.killed) apiServer.kill("SIGTERM");
  if (!reactServer.killed) reactServer.kill("SIGTERM");
  process.exitCode = exitCode;
};

apiServer.on("error", (error) => {
  console.error("Could not start the local ElevenLabs API:", error.message);
  stop(1);
});
reactServer.on("error", (error) => {
  console.error("Could not start the React development server:", error.message);
  stop(1);
});
reactServer.on("exit", (code) => stop(code || 0));
apiServer.on("exit", (code) => {
  if (!isStopping && code !== null && code !== 0) {
    console.error("The local ElevenLabs API server stopped unexpectedly.");
    stop(code);
  }
});

process.on("SIGINT", () => stop(0));
process.on("SIGTERM", () => stop(0));
