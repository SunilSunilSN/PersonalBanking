const { ModuleFederationPlugin } = require("webpack").container;
const path = require("path");
require("dotenv").config({ path: "D:/My Applications/Personal Banking Application/Frontend/SharedServices/Environments/.env.dev" });
const fs = require("fs");

const microapps = Object.entries(process.env)
console.log("sUNIL" + microapps.PORT);

module.exports = {
  webpack: {
    configure: (config) => {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "base_app",
          remotes: {
            // login_app: "login_app@http://localhost:3000/login-app/remoteEntry.js",
            // preLogin_app: "preLogin_app@http://localhost:3000/preLogin_app/remoteEntry.js",
            // preLogin_app: `preLogin_app@${process.env.REACT_APP_PRELOGIN_REMOTE_ENTRY}`
             // Adjust if your login app runs on a different port
          },
          shared: {
            react: { singleton: true, eager: true },
            "react-dom": { singleton: true, eager: true },
          },
        })
      );
      config.resolve.alias["@common"] = path.resolve(__dirname, "../Common");
      return config;
    },
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
