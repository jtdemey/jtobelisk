This guide presumes that you have:
- Installed [gpg](/platforms/cryptography/gpg) on your system
- Generated an encryption-capable keypair with your desired configuration
- Imported the public key of the intended recipient of your data into your gpg keyring

**WARNINGS**
- Information and messages written directly into your terminal could be written to your shell history.
    - By default, bash will not write any command prepended with a space (" ") to its history.
- While gpg is running, anyone with access to your system will potentially be able to access the
unencrypted text
- For the above reasons, it is generally good practice to write sensitive information to a temporary
.txt file and then [encrypt that file with PGP](/guides/communication/encrypt-file-with-pgp).

This guide will show you how to encrypt the phrase "Pack my box with five dozen liquor jugs" using the
PGP public key belonging to *recipient@domain.com*.

1) First, open a terminal.
2) Open a terminal and enter:
```
 echo "Pack my box with five dozen liquor jugs." | gpg --encrypt --armor -r recipient@domain.com 
```
3) Copy the outputted content in your terminal from the beginning of the line reading
"-----BEGIN PGP MESSAGE-----" to the end of the line reading "-----END PGP MESSAGE-----".

The encrypted text can now be pasted to any messaging platform of your choosing, including emails
and instant messages. The only person who can decrypt and read the original message is the owner
of the private key associated to *recipient@domain.com*.

###### References
- https://gnupg.org/gph/en/manual.html#AEN26
- https://www.digitalocean.com/community/tutorials/how-to-use-gpg-to-encrypt-and-sign-messages
- https://www.misterpki.com/gpg-encrypt/
