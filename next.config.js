const { resolve } = require("path");

module.exports = {
  webpack(config, options) {
    config.resolve.alias["@components"] = resolve(__dirname, "components");
    config.resolve.alias["@variables"] = resolve(__dirname, "variables");
    config.resolve.alias["@models"] = resolve(__dirname, "models");
    config.resolve.alias["@tools"] = resolve(__dirname, "tools");
    return config;
  }
};