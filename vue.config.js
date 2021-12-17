/*
 * @Author: abc
 * @Date: 2021-08-05 17:17:31
 * @LastEditors: abc
 * @LastEditTime: 2021-08-05 17:18:16
 * @Description:
 */
let pattern = false;
if (process.env.NODE_ENV !== 'production') {
  pattern = true;
} else {
  pattern = false;
}
console.log(pattern);
module.exports = {
  //publicPath: process.env.NODE_ENV === 'production' ? './' : './',
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico'
    }
  },
  productionSourceMap: pattern,
  css: {
    sourceMap: pattern,
    extract: !pattern
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    }
  }
};
