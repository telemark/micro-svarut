const { promisify } = require('util')
const readFileAsync = promisify(require('fs').readFile)
const md = require('markdown-it')()
const svarUt = require('node-svarut')
const { send, json } = require('micro')
const config = { config: { url: process.env.SVARUT_URL } }

exports.front = async (req, res) => {
  const readme = await readFileAsync('./README.md', 'utf-8')
  const html = md.render(readme)
  send(res, 200, html)
}

exports.sendForsendelse = async (req, res) => {
  const data = { query: await json(req) }
  const options = Object.assign(data, config)

  try {
    const svarutData = await svarUt.sendForsendelse(options)
    send(res, 200, svarutData)
  } catch (error) {
    send(res, 500, error.message)
  }
}

exports.retrieveForsendelseHistorikk = async (req, res) => {
  const { id } = req.params
  const options = Object.assign({ query: { forsendelsesid: id } }, config)

  try {
    const svarutData = await svarUt.retrieveForsendelseHistorikk(options)
    send(res, 200, svarutData)
  } catch (error) {
    console.log(error)
    send(res, 500, error.message || error)
  }
}

exports.retrieveForsendelseIdByEksternRef = async (req, res) => {
  const { id } = req.params
  const options = Object.assign({ query: { forsendelsesid: id } }, config)

  try {
    const svarutData = await svarUt.retrieveForsendelseIdByEksternRef(options)
    send(res, 200, svarutData)
  } catch (error) {
    send(res, 500, error.message || error)
  }
}

exports.retrieveForsendelseStatus = async (req, res) => {
  const { id } = req.params
  console.log(id)
  const options = Object.assign({ query: { forsendelsesid: id } }, config)

  try {
    const svarutData = await svarUt.retrieveForsendelseStatus(options)
    send(res, 200, svarutData)
  } catch (error) {
    send(res, 500, error.message || error)
  }
}

exports.setForsendelseLestAvEksterntSystem = async (req, res) => {
  const data = { query: await json(req) }
  const options = Object.assign(data, config)

  try {
    const svarutData = await svarUt.setForsendelseLestAvEksterntSystem(options)
    send(res, 200, svarutData)
  } catch (error) {
    send(res, 500, error.message || error)
  }
}

exports.retrieveForsendelseStatuser = async (req, res) => {
  const payload = await json(req)
  console.log(payload)
  try {
    const data = { query: payload }
    const options = Object.assign(data, config)
    const svarutData = await svarUt.retrieveForsendelseStatuser(options)
    send(res, 200, svarutData)
  } catch (error) {
    console.log(error)
    send(res, 500, error.message || error)
  }
}
