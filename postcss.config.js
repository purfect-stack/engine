const cssNext = require('postcss-cssnext')
const postcssImport = require('postcss-import')
const customMedia = require('postcss-custom-media')
const nested = require('postcss-nested')
const colorFunction = require('postcss-color-function')
const cssVariables = require('postcss-css-variables')

module.exports = {
  plugins: [
    postcssImport(),
    cssNext(),
    customMedia(),
    nested(),
    colorFunction(),
    cssVariables()
  ]
}
