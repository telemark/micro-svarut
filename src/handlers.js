const svarUt = require('svarut')
const log = require('./log')
const config = { config: { url: process.env.SVARUT_URL } }

async function getMethod (request) {
  return request.url.split('/')[1]
}

exports.post = async (request, response) => {
  const method = await getMethod(request)
  log('info', `POST /${method}`)
  const data = { query: await request.body }
  const options = Object.assign(data, config)

  try {
    const svarutData = await svarUt[method](options)
    log('info', `Got data:\n${svarutData}`)
    response.json(svarutData)
  } catch (error) {
    log('err', error.message)
    response.status(error.statusCode || 500)
    response.send(error.message || error)
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
    response.json(svarutData)
  } catch (error) {
    response.status(error.statusCode || 500)
    response.send(error.message || error)
  }
}
