const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;
const path = require("path");

module.exports = {
  webpack: {
    configure: (config) => {
      config.plugins.push(
        new ModuleFederationPlugin({
          name: "base_app",
          remotes: {
            login_app: "login_app@http://localhost:3000/remoteEntry.js", // Adjust if your login app runs on a different port
          },
          shared: {
            react: { singleton: true, eager: true, requiredVersion: deps.react },
            "react-dom": { singleton: true, eager: true, requiredVersion: deps["react-dom"] },
          },
        })
      );
      config.resolve.alias["@common"] = path.resolve(__dirname, "../Common");
      return config;
    },
  },
};
