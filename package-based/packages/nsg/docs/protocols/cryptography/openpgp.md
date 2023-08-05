OpenPGP is a standard for "Pretty Good Privacy" defined by the OpenPGP Working Group of the Internet Engineering Task Force (IETF).[^1]
Originally, PGP was a standalone program written by [Phil Zimmermann](https://philzimmermann.com/EN/background/index.html), but now
it is a Proposed Standard, [RFC4880](https://datatracker.ietf.org/doc/html/rfc4880), which is most commonly used with the
[GNU Privacy Guard (gpg)](/platforms/cryptography/gpg).

The standard allows for:
    - Signing things with a digital signature verifying the authenticity of the sender
    - Encrypting things so they can only be decrypted and read by the intended recipient
    - Decrypting things that was encrypted using your public keys

In this context, "things" can refer to raw text, emails, files, directories, or even whole disk partitions. The standard has no
specified maximum size as to what it can encrypt. The maximum packet size is ~4GB, but any data exceeding this is simply broken
into multiple packets.[^2]

###### References
[^1]: https://www.openpgp.org/
[^2]: https://datatracker.ietf.org/doc/html/rfc4880
