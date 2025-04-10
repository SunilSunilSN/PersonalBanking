const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

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
            "./LoginPage": "./src/LoginPage", // adjust if needed
          },
          shared: {
            react: { singleton: true, eager: true, requiredVersion: deps.react },
            "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] },
          },
        })
      );

      return config;
    },
    
  },
};
