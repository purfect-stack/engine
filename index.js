#! /usr/bin/env node
const fs = require('fs')
const webpack = require('webpack')
const DevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config')

const srcPathIndex = `${process.cwd()}/src/index.js`
const srcPathIndexJsx = `${process.cwd()}/src/index.jsx`

const START_ARG = '--start'
const BUILD_ARG = '--build'

if (!fs.existsSync(srcPathIndex) && !fs.existsSync(srcPathIndexJsx)) {
  console.log('No /src/index.jsx was found, can not start application!')
  return 1
}

if (process.argv.includes(START_ARG)) {
  startDevMode()
}

if (process.argv.includes(BUILD_ARG)) {

}

function startDevMode () {
  const config = webpackConfig(null, {
    mode: 'development'
  })
  const instance = webpack(config)
  const server = new DevServer(instance, config.devServer)

  server.listen('1234', 'localhost', function (err) {
    if (err) {
      console.log(err);
    }
    console.log('WebpackDevServer listening at localhost:', '1234');
  });
  console.log('starting in dev mode...')
}
