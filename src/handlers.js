const { promisify } = require('util')
const readFileAsync = promisify(require('fs').readFile)
const md = require('markdown-it')()
const svarUt = require('svarut')
const { send, json } = require('micro')
const { parse } = require('url')
const log = require('./log')
const config = { config: { url: process.env.SVARUT_URL } }

async function getMethod (request) {
  const { pathname } = await parse(request.url, true)
  return pathname.split('/')[1]
}

exports.front = async (request, response) => {
  const readme = await readFileAsync('./README.md', 'utf-8')
  const html = md.render(readme)
  log('info', 'GET /')
  send(response, 200, html)
}

exports.post = async (request, response) => {
  const method = await getMethod(request)
  log('info', `POST /${method}`)
  const data = { query: await json(request) }
  const options = Object.assign(data, config)

  try {
    const svarutData = await svarUt[method](options)
    log('info', `Got data:\n${svarutData}`)
    send(response, 200, svarutData)
  } catch (error) {
    log('err', error.message)
    send(response, error.statusCode || 500, error.message)
  }
}

exports.get = async (request, response) => {
  const method = await getMethod(request)
  log('info', `POST /${method}`)
  const { id: forsendelsesid } = request.params
  const query = { query: { forsendelsesid } }
  const options = Object.assign(query, config)

  try {
    const svarutData = await svarUt[method](options)
    log('info', `Got data:\n${svarutData}`)
    send(response, 200, svarutData)
  } catch (error) {
    log('err', error.message)
    send(response, 500, error.message || error)
  }
}
