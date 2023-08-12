const colors = require('colors')

const info = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params, colors.green('✓'))
  }
}
const error = (...params) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params, colors.red('✗'))
  }
}

module.exports = {
  info,
  error,
}
