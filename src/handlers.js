const { promisify } = require('util')
const readFileAsync = promisify(require('fs').readFile)
const md = require('markdown-it')()
const svarUt = require('svarut')
const { send, json } = require('micro')
const { parse } = require('url')
const config = { config: { url: process.env.SVARUT_URL } }

async function getMethod (request) {
  const { pathname } = await parse(request.url, true)
  return pathname.split('/')[1]
}

exports.front = async (request, response) => {
  const readme = await readFileAsync('./README.md', 'utf-8')
  const html = md.render(readme)
  send(response, 200, html)
}

exports.post = async (request, response) => {
  const method = await getMethod(request)
  const data = { query: await json(request) }
  const options = Object.assign(data, config)

  try {
    const svarutData = await svarUt[method](options)
    send(response, 200, svarutData)
  } catch (error) {
    console.error(error)
    send(response, error.statusCode || 500, error.message)
  }
}

exports.get = async (request, response) => {
  const method = await getMethod(request)
  const { id: forsendelsesid } = request.params
  const query = method === 'retrieveSigneringshistorikk' ? { query: { forsendelsesid } } : { query: { forsendelsesid } }
  const options = Object.assign(query, config)

  try {
    const svarutData = await svarUt[method](options)
    send(response, 200, svarutData)
  } catch (error) {
    console.log(error)
    send(response, 500, error.message || error)
  }
}
