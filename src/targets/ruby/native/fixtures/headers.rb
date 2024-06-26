require 'uri'
require 'net/http'

url = URI("https://httpbin.org/headers")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["accept"] = 'application/json'
request["x-foo"] = 'Bar'
request["x-bar"] = 'Foo'
request["quoted-value"] = '"quoted" \'string\''

response = http.request(request)
puts response.read_body