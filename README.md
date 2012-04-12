This is the zogger add-on.  It contains:

* A program (lib/main.js).
* A few tests.
* Some meager documentation.


It is based on add-on sdk. 

Add-on sdk fasttrack setup:
---------------------------

1. Download and install

 - wget https://ftp.mozilla.org/pub/mozilla.org/labs/jetpack/jetpack-sdk-latest.tar.gz --no-check-certificate
 - tar -xvf addon-sdk-1.6.1.tar.gz

2. Activate addon-sdk

 - cd addon-sdk-1.6.1
 - source bin/activate

This makes addon development environment available via 'cfx' command.

3. Examine (local generated) documentation:

 - cfx docs

4. Create your project:

 - mkdir my-addon
 - cd my-addon
 - cfx init
 - ls
