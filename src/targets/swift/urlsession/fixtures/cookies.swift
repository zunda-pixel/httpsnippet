import Foundation

let url = URL(string: "https://httpbin.org/cookies")!
var request = URLRequest(url: url)
request.httpMethod = "GET"
request.timeoutInterval = 10
request.allHTTPHeaderFields = ["cookie": "foo=bar; bar=baz"]

do {
  let (data, response) = try await URLSession.shared.data(for: request)
  print(String(decoding: data, as: UTF8.self))
} catch {
  print(["errordayo": error.localizedDescription])
  print(error)
}
