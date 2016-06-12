var tape = require('tape')
var net = require('net')
var http = require('http')
var https = require('https')
var isTLSClientHello = require('./')

tape('http', t => {
  t.plan(1)

  var tcpServer = net.createServer(socket => {
    socket.once('data', data => {
      t.equal(isTLSClientHello(data), false)
      socket.destroy()
      tcpServer.close()
    })
  })

  tcpServer.listen('9000', () => {
    http.request({
      hostname: 'localhost',
      port: '9000',
    })
      .on('error', () => {})
      .end()
  })
})

tape('https', t => {
  t.plan(1)

  var tcpServer = net.createServer(socket => {
    socket.once('data', data => {
      t.equal(isTLSClientHello(data), true)
      socket.destroy()
      tcpServer.close()
    })
  })

  tcpServer.listen('9000', () => {
    https.request({
      hostname: 'localhost',
      port: '9000',
    })
      .on('error', () => {})
      .end()
  })
})
