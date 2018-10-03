// Packages
const Router = require('router')
const finalhandler = require('finalhandler')
const cors = require('cors')
const jwt = require('express-jwt')

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
router.use(jwt({ secret: JWT_SECRET }).unless({ path: ['/'] }))

// Map routes to handlers
router.get('/', handlers.front)
router.post('/sendForsendelse', handlers.post)
router.post('/sendForsendelseMedId/:id', handlers.post)
router.get('/startNyForsendelse', handlers.get)
router.get('/retreiveForsendelsesTyper', handlers.get)
router.get('/retrieveMottakerSystemForOrgnr/:id', handlers.get)
router.get('/retrieveForsendelsesIderByEksternRef/:id', handlers.get)
router.get('/retrieveDokumentMetadata/:id', handlers.get)
router.get('/retrieveForsendelsesHistorikk/:id', handlers.get)
router.get('/retrieveForsendelsesIdByEksternRef/:id', handlers.get)
router.get('/retrieveForsendelsesStatus/:id', handlers.get)
router.post('/retrieveForsendelsesStatuser', handlers.post)
router.post('/setForsendelseLestAvEksterntSystem', handlers.post)
router.post('/retrieveSigneringsHistorikkForFlereForsendelser', handlers.post)
router.get('/retrieveSigneringshistorikk/:id', handlers.get)

module.exports = (request, response) =>
  router(request, response, finalhandler(request, response))
