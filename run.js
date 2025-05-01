const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const os = require("os");

// Check if server.js exists
if (!fs.existsSync("./server.js")) {
  console.error(
    "server.js not found. Make sure you are in the correct directory."
  );
  process.exit(1);
}

// Check if node_modules exists (check if dependencies are installed)
if (!fs.existsSync("./node_modules")) {
  console.log("Dependencies not installed. Running installation script...");
  require("./install.js");
}

console.log("Starting university landing page server...");

// Determine the appropriate command to run npm
const npmCmd = os.platform() === "win32" ? "npm.cmd" : "npm";

// Start the server using npm run dev
const server = spawn(npmCmd, ["run", "dev"], { stdio: "inherit" });

server.on("error", (error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});

// Handle signals for graceful shutdown
process.on("SIGINT", () => {
  console.log("Stopping server...");
  server.kill("SIGINT");
  process.exit(0);
});

process.on("SIGTERM", () => {
  console.log("Stopping server...");
  server.kill("SIGTERM");
  process.exit(0);
});
