import axios from 'axios';

const form = new FormData();
form.append('foo', 'bar');

const options = {
  method: 'POST',
  url: 'https://httpbin.org/anything',
  headers: {'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001'},
  data: '[form]'
};

axios
  .request(options)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));