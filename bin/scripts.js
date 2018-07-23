#! /usr/bin/env node
const path = require('path')
const webpackConfigPath = path.resolve(__dirname, '..', 'webpack.config.js')
const CONFIG_ARG = `--config=${webpackConfigPath}`
const init = require('./init.js')

const isFunction = (obj) => {
  return !!(obj && obj.constructor && obj.call && obj.apply)
}

const COMMANDS = {
  start: {
    command: 'webpack-dev-server',
    args: [
      '--mode=development',
      CONFIG_ARG
    ]
  },
  'start:prod': {
    command: 'webpack-dev-server',
    args: [
      '--mode=production',
      CONFIG_ARG
    ]
  },
  build: {
    command: 'webpack',
    args: [
      '--mode=production',
      CONFIG_ARG
    ]
  },
  init
}

const commandEntry = COMMANDS[process.argv[2]]

if (isFunction(commandEntry)) {
  commandEntry()
  return
}

let { command, args = [] } = commandEntry || {}

if (!command) {
  console.log('Purfect Engine: Command not found!')
  return
}

const spawn = require('child_process').spawn
const child = spawn(`node_modules/.bin/${command}`, args)

child.stdout.on('data', function (data) {
  process.stdout.write(data)
});

child.stderr.on('data', function (data) {
  process.stdout.write(data)
});
