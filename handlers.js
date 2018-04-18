const { promisify } = require('util')
const readFileAsync = promisify(require('fs').readFile)
const md = require('markdown-it')()
const svarUt = require('svarut')
const { send, json } = require('micro')
const { parse } = require('url')
const config = { config: { url: process.env.SVARUT_URL } }

async function getMethod (req) {
  const { pathname } = await parse(req.url, true)
  return pathname.split('/')[1]
}

exports.front = async (req, res) => {
  const readme = await readFileAsync('./README.md', 'utf-8')
  const html = md.render(readme)
  send(res, 200, html)
}

exports.post = async (req, res) => {
  const method = await getMethod(req)
  const data = { query: await json(req) }
  const options = Object.assign(data, config)

  try {
    const svarutData = await svarUt[method](options)
    send(res, 200, svarutData)
  } catch (error) {
    console.error(error)
    send(res, error.statusCode || 500, error.message)
  }
}

exports.get = async (req, res) => {
  const method = await getMethod(req)
  const { id } = req.params
  const query = method === 'retrieveSigneringshistorikk' ? { query: { forsendelseid: id } } : { query: { forsendelsesid: id } }
  const options = Object.assign(query, config)

  try {
    const svarutData = await svarUt[method](options)
    send(res, 200, svarutData)
  } catch (error) {
    console.log(error)
    send(res, 500, error.message || error)
  }
}
