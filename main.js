'use strict';

const createTestCafe = require('testcafe');
const selfSignedCertificate = require('openssl-self-signed-certificate');
let runner = null;

const sslOptions = {
    key:    selfSignedCertificate.key,
    cert:   selfSignedCertificate.cert
};

createTestCafe('localhost', 1337, 1338, sslOptions)
.then(testcafe => {
    runner = testcafe.createRunner();
})
.then(() => {
    return runner.src('./tests_by_website/')
    .browsers('chrome --allow-insecure-localhost')
    .run({
        skipJsErrors:   true,
        debugOnFail:    true
    });
});