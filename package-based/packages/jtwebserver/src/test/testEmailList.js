import assert from "node:assert/strict";

const BASE_URI = "http://localhost:3000/";

const makeRequest = (options) => fetch(`${BASE_URI}bast/subscribe`, options);

makeRequest({
  method: "post",
  body: {},
}).then((response) => {
  assert.equal(response.status, 400);
  response.json().then((jsonReponse) => {
    console.log(jsonReponse);
  });
}).catch((error) => process.stderr.write(`${error}\n`));
