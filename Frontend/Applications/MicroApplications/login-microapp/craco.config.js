const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const path = require("path");
module.exports = {
  webpack: {
    configure: (config) => {
      console.log("✅ CRACO config loaded for login-microapp");
      config.output.publicPath = "auto";
      config.output.library = "login_app";
      config.output.libraryTarget = "var";
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "login_app",
          filename: "remoteEntry.js",
          exposes: {
            "./LoginPage": "./src/LoginPage",
            "./RegistrationPage": "./src/RegistrationPage",
            "./MicroAppMapper": "./src/Common/MicroAppMapper"
          },
          shared: {
            react: { singleton: true, eager: true },
            "react-dom": { singleton: true, eager: true },
          },
        })
      );
      return config;
    },
  },
};
