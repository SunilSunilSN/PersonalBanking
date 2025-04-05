const path = require("path");
const dotenv = require("dotenv");

function loadEnvironment() {
    const env = process.env.NODE_ENV || "dev";
    const envPath = path.resolve(__dirname, `.${env}.env`);
    const result = dotenv.config({ path: envPath });
    if (result.error) {
        console.log(`❌ Failed variables load .env.${env}:`, result.error);
    } else {
        console.log(`✅ Environment variables loaded from ${envPath}`);
    }
};

module.exports = loadEnvironment;