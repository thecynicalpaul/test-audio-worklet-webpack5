const withPlguins = require("next-compose-plugins");
const path = require("path");

module.exports = withPlguins([

], {
  future: {webpack5: true},
  webpack: (config, options) => {
    config.output.globalObject = `(typeof self !== 'undefined' ? self : this)`;
    config.output.publicPath = "/_next/";

    config.output.chunkFilename =  options.isServer
      ? `${options.dev ? '[name]' : '[name].[fullhash]'}.js`
      : `static/chunks/${options.dev ? '[name]' : '[name].[fullhash]'}.js`;

    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        "standardized-audio-context": "standardized-audio-context/build/es5/bundle",
        "audio-worklet": path.resolve(__dirname, "src/util/audio-worklet")
      }
    }

    config.module.parser = {
      ...config.module.parser,
      javascript: {
        worker: ["AudioWorklet from audio-worklet", "..."]
      }
    }

    return config;
  }
});
