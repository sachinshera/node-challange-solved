const tape = require('tape')
const jsonist = require('jsonist')

const PORT = process.env.PORT = process.env.PORT || require('get-PORT-sync')()
const server = require('./server')

const urlBase = `http://localhost:${PORT}`;
let urlInBase64 = "aHR0cDovL2xvY2FsaG9zdDozMDAw";
const urlBase64 = Buffer.from(urlInBase64, 'base64').toString('ascii');

tape('should respond hello', (t) => {
  // add user-agent  in header
  jsonist.get(urlBase64, { headers: { 'user-agent': 'tape' } }, (err, body) => {
    if (err) t.error(err)
    t.equal(body.msg, 'hello')
    t.end()
  })
})

tape('cleanup', function (t) {
  server.close()
  t.end()
})
