import tap from 'tap-esm'
import net from 'net'
import http from 'http'
import https from 'https'
import isTLSClientHello from './index.js'

tap('http', t => {
  t.plan(1)

  var tcpServer = net.createServer(socket => {
    socket.once('data', data => {
      t.equal(isTLSClientHello(data), -2)
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

tap('https', t => {
  t.plan(1)

  var tcpServer = net.createServer(socket => {
    socket.once('data', data => {
      t.equal(isTLSClientHello(data), 1)
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

tap('returns the number of bytes needed to parse the record if the buffer is not long enough', t => {
  t.plan(1)
  var length = 2
  var data = new Uint8Array([22, 3, 1, 0, length, 1])
  t.equal(isTLSClientHello(data), 5 + length)
})
