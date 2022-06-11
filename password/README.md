# Password Generator

A simple password generator available at [102.github.io/password][gh-pages]

## Security concerns

This password generator is not expected to be complete replacement for decent
password generators or password managers; instead, it was made just due to the
curiocity.

However, the password generator uses [Web Crypto API][crypto-api] that is
supposed to be cryptographically safe, so it can be assumed that it should
generate passwords that are random enough.

This package does everything on the client side, and no server-side code or
analytics scripts are included.

[gh-pages]: https://102.github.io/password/
[crypto-api]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
