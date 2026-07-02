# urql-exchange-signedops

**urql-exchange-signedops** provides [urql exchanges][] that implement signed operations.

It ships two exchange implementations:

- **aheadOfTimeSignExchange**: Signs GraphQL operations ahead of time and attaches the corresponding signature when a request is sent.
  - It is more secure and strict, so it is recommended for production use.
- **justInTimeSignExchange**: Signs each request at send time.
  - Because it accesses the signing key and signs synchronously during the exchange's execution, it has worse runtime performance.
  - It is useful when pre-signing operations is undesirable.

[urql exchanges]: https://nearform.com/open-source/urql/docs/architecture/#the-client-and-exchanges
