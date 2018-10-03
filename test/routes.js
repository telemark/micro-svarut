process.env['SVARUT_URL'] = 'https://username:password@test.svarut.ks.no/tjenester/forsendelseservice/ForsendelsesServiceV7'
process.env['JWT_SECRET'] = 'abc123'

const test = require('ava')
const listen = require('test-listen')
const axios = require('axios')
const micro = require('micro')
const srv = require('../src/index')

const getUrl = fn => {
  const srv = micro(fn)
  return listen(srv)
}

test('it returns README as frontpage', async t => {
  const url = await getUrl(srv)
  const result = await axios.get(url)
  t.true(result.data.includes('MIT'), 'frontpage ok')
})

test('it returns unauthorized', async t => {
  axios.defaults.headers.common['Authorization'] = 'wrong'
  const url = await getUrl(srv)
  try {
    await axios.get(url + '/retrieveForsendelseStatuser')
  } catch (e) {
    t.true(e.response.status === 401)
    t.true(e.response.statusText === 'Unauthorized')
  }
})
