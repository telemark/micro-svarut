const { name, version } = require('../package.json')

module.exports = (level, message) => {
  const formatedMessage = typeof message === 'object' ? JSON.stringify(message) : message
  return console.log(`[${level.toUpperCase()}] ${new Date().toUTCString()} ${name} - ${version}: ${formatedMessage}`)
}
