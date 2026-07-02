# graphql-signedops

graphql-signedops is a repository providing several packages that support signed operations.

## What are signed operations?

Signed query is one pattern of [GraphQL Trusted Documents][].

### Comparison with Persisted Queries

[Persisted Queries][] is also one such pattern, but it requires registering queries with the server in advance.

While Persisted Queries share the query directly between client and server, signed operations only share the key used for signing.

The client signs the query in advance, in a trusted environment where it can access the key (e.g. a developer's machine or a CI environment), and adds the signature to the extensions field at request time. The original query field and others are sent as-is.

The server extracts the signature from the extensions field, verifies it with the key used for signing, executes the query as-is if verification passes, and rejects the request if it fails.

This server behavior can be changed by developers; for example, it can be skipped during local development.

### Signature verification method

Signing uses [JWT][].
The signing and verification methods are formalized, and implementations are available across many languages and runtimes.

This makes it easy to achieve consistent signature verification between client and server.

The URL-safe encoding of signatures is also a good fit for GraphQL, which communicates over HTTP.

## License

See [LICENSE](LICENSE) file.

[GraphQL Trusted Documents]: https://benjie.dev/graphql/trusted-documents
[Persisted Queries]: https://relay.dev/docs/guides/persisted-queries/
[JWT]: https://www.jwt.io/
