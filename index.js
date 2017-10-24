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
router.post('/sendForsendelse', handlers.sendForsendelse)
router.get('/retrieveForsendelseHistorikk/:id', handlers.retrieveForsendelseHistorikk)
router.get('/retrieveForsendelseIdByEksternRef/:id', handlers.retrieveForsendelseIdByEksternRef)
router.get('/retrieveForsendelseStatus/:id', handlers.retrieveForsendelseStatus)
router.post('/retrieveForsendelseStatuser', handlers.retrieveForsendelseStatuser)
router.post('/setForsendelseLestAvEksterntSystem', handlers.setForsendelseLestAvEksterntSystem)

module.exports = jwtAuth(JWT_SECRET, [ '/' ])((req, res) =>
  router(req, res, finalhandler(req, res))
)
