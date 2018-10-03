const pkg = require('../package.json')

module.exports = (level, message) => {
  const formatedMessage = typeof message === 'object' ? JSON.stringify(message) : message
  console.log(`[${level.toUpperCase()}] ${new Date().toUTCString()} ${pkg.name} - ${pkg.version}: ${formatedMessage}`)
}
