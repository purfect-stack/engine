#! /usr/bin/env node
const path = require('path')
const webpackConfigPath = path.resolve(__dirname, '..', 'webpack.config.js')
const CONFIG_ARG = `--config=${webpackConfigPath}`

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
  }
}
const { command, args = [] } = COMMANDS[process.argv[2]] || {}

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
