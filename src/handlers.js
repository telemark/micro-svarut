const svarUt = require('svarut')
const { send, json } = require('micro')
const log = require('./log')
const config = { config: { url: process.env.SVARUT_URL } }

async function getMethod (request) {
  return request.url.split('/')[1]
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
