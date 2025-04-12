// SharedServices/Environments/EnvironmentLoader.js
const dotenv = require("dotenv");
const path = require("path");
const { spawn } = require("child_process");

// ENV_FILE=dev
const envFile = process.env.ENV_FILE || "dev";

// Load the correct .env file
dotenv.config({
  path: path.resolve(__dirname, `.env.${envFile}`)
});

console.log(`✅ Loaded env: ${path.resolve(__dirname, "Environments", `.env.${envFile}`)}`);

// Get APP (e.g., base, login)
const app = process.env.APP;

if (!app) {
  console.error("❌ APP variable not defined (e.g., APP=login or APP=base)");
  process.exit(1);
}

// Try to get PORT_LOGIN, PORT_BASE, etc.
const portKey = `PORT_${app.toUpperCase()}`;
const actualPort = process.env[portKey];

if (!actualPort) {
  console.error(`❌ Port not found for key ${portKey}`);
  process.exit(1);
}

process.env.PORT = actualPort;

// Log it for debug
console.log(`✅ Starting ${app} on port ${actualPort} (key = ${portKey})`);

const child = spawn("yarn", ["craco", "start"], {
  stdio: "inherit",
  shell: true,
  env: process.env
});
