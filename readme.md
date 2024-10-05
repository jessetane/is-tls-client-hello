# is-tls-client-hello
Determine if a buffer contains a valid TLS ClientHello.

## Why
You need to make a routing decision based on whether a connection wants to use TLS or not.

## How
* returns 1 if the buffer contains a valid TLS ClientHello
* returns -1 if the buffer is not long enough to determine the record length
* returns -2 if TLS ContentType !== 22
* returns -3 if TLS ProtocolVersion is < 3.1 or > 3.3
* returns -4 if TLS HandshakeType !== 1
* returns the total number of bytes required to parse the record if the buffer is not long enough

## Test
Verifies that requests from node's HTTP and HTTPS modules can be distiguished over a plain TCP socket.
``` shell
$ npm test
```

## Releases
* 2.0.0
  * It can be useful to know why a buffer does not contain a hello, in particular when the buffer is simply not long enough.

## License
Public domain
