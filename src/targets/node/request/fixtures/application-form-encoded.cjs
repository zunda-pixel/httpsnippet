const request = require('request');

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'content-type': 'application/x-www-form-urlencoded'},
  form: {foo: 'bar', hello: 'world'}
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});