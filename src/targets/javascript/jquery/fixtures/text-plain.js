const settings = {
  async: true,
  crossDomain: true,
  url: 'https://httpbin.org/anything',
  method: 'POST',
  headers: {
    'content-type': 'text/plain'
  },
  data: 'Hello World'
};

$.ajax(settings).done(res => {
  console.log(res);
});