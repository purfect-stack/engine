const path = require('path')
const copy = require('copy')

const cwd = process.cwd()
const SRC_DIRECTORY = 'src'

const from = path.resolve(`${__dirname}/../${SRC_DIRECTORY}/**`)
const to = `${cwd}/${SRC_DIRECTORY}`

module.exports = () => {
  copy(from, to, () => {
    console.log('Successfully initialized entry points!')
  })
}
