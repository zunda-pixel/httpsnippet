import Foundation

let parameters = ["foo": nil] as [String : Any]

let postData = try JSONSerialization.data(withJSONObject: parameters, options: [])

let url = URL(string: "https://httpbin.org/anything")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.timeoutInterval = 10
request.allHTTPHeaderFields = ["content-type": "application/json"]
request.httpBody = postData

do {
  let (data, response) = try await URLSession.shared.data(for: request)
  print(String(decoding: data, as: UTF8.self))
} catch {
  print(["errordayo": error.localizedDescription])
  print(error)
}
