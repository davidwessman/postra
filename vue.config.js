module.exports = {
  publicPath: process.env.NODE_ENV == "production" ? "/poster-wall" : "/",
  css: {
    sourceMap: true
  }
};
