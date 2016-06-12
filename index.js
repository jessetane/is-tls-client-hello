module.exports = function isTLSClientHello (data) {
  /*
  From https://tools.ietf.org/html/rfc5246:

  enum {
      change_cipher_spec(20), alert(21), handshake(22),
      application_data(23), (255)
  } ContentType;

  struct {
      uint8 major;
      uint8 minor;
  } ProtocolVersion;

  struct {
      ContentType type;
      ProtocolVersion version;
      uint16 length;
      opaque fragment[TLSPlaintext.length];
  } TLSPlaintext;

  enum {
      hello_request(0), client_hello(1), server_hello(2),
      certificate(11), server_key_exchange (12),
      certificate_request(13), server_hello_done(14),
      certificate_verify(15), client_key_exchange(16),
      finished(20)
      (255)
  } HandshakeType;

  struct {
      HandshakeType msg_type;
      uint24 length;
      select (HandshakeType) {
          case hello_request:       HelloRequest;
          case client_hello:        ClientHello;
          case server_hello:        ServerHello;
          case certificate:         Certificate;
          case server_key_exchange: ServerKeyExchange;
          case certificate_request: CertificateRequest;
          case server_hello_done:   ServerHelloDone;
          case certificate_verify:  CertificateVerify;
          case client_key_exchange: ClientKeyExchange;
          case finished:            Finished;
      } body;
  } Handshake;
  */

  // make sure we have enough data to get at least the record length
  // (ContentType + ProtocolVersion + length)
  var headerSize = 5
  if (data.length < headerSize) return false

  // verify ContentType is handshake
  if (data[0] !== 22) return false

  // verify protocol version is > 3.0 && <= 3.3
  var majorVersion = data[1]
  var minorVersion = data[2]
  if (majorVersion !== 3) return false
  if (minorVersion < 1 || minorVersion > 3) return false

  // verify we have enough data to parse the record
  var length = data[3] << 8 | data[4]
  if (data.length < headerSize + length) return false

  // verify handshake type is client hello
  if (data[5] !== 1) return false

  return true
}
