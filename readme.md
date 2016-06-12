# is-tls-client-hello
Determine if a buffer contains a valid TLS ClientHello.

## Why
You need to make a routing decision based on whether a connection wants to use TLS or not.

## How
Verifies that:
* The TLS ContentType is handshake(22)
* The TLS ProtocolVersion is >= 3.1 and <= 3.3
* The buffer is big enough to contain the entire record
* The HandshakeType is client_hello(1)

## Test
Verifies that requests from node's HTTP and HTTPS modules can be distiguished over a plain TCP socket.
``` shell
$ npm test
```

## License
Public domain
