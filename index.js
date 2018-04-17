// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwtAuth = require('micro-jwt-auth')

// handlers
const handlers = require('./handlers')

// Initialize a new router
const router = Router()

// JWT
const { JWT_SECRET, SVARUT_URL } = process.env

// Exit if environment variables is not set
if (!JWT_SECRET || !SVARUT_URL) {
  console.error('Must set environment variables: JWT_SECRET and SVARUT_URL')
  process.exit(1)
}

// Plugins
router.use(cors())

// Map routes to handlers
router.get('/', handlers.front)
router.post('/sendForsendelse', handlers.post)
router.get('/retrieveForsendelseHistorikk/:id', handlers.get)
router.get('/retrieveForsendelseIdByEksternRef/:id', handlers.get)
router.get('/retrieveForsendelseStatus/:id', handlers.get)
router.post('/retrieveForsendelseStatuser', handlers.post)
router.post('/setForsendelseLestAvEksterntSystem', handlers.post)
router.post('/retrieveSigneringshistorikkForFlereForsendelser', handlers.post)
router.get('/retrieveSigneringshistorikk', handlers.get)

module.exports = jwtAuth(JWT_SECRET, [ '/' ])((req, res) =>
  router(req, res, finalhandler(req, res))
)
