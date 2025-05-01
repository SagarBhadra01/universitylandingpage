const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("Starting university landing page installation...");

// Check if Node.js is installed
try {
  const nodeVersion = execSync("node --version").toString().trim();
  console.log(`Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error(
    "Node.js is not installed. Please install Node.js v14 or higher."
  );
  process.exit(1);
}

// Check if package.json exists
if (!fs.existsSync("./package.json")) {
  console.error(
    "package.json not found. Make sure you are in the correct directory."
  );
  process.exit(1);
}

// Install dependencies
console.log("Installing dependencies...");
try {
  execSync("npm install", { stdio: "inherit" });
  console.log("Dependencies installed successfully!");
} catch (error) {
  console.error("Failed to install dependencies:", error.message);
  process.exit(1);
}

console.log("\n");
console.log("Installation complete! You can now run the server with:");
console.log("\x1b[33m%s\x1b[0m", "npm run dev");
console.log("\n");
console.log("Then open your browser and go to:");
console.log("\x1b[36m%s\x1b[0m", "http://localhost:3000");
