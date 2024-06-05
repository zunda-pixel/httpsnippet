import Foundation

let url = URL(string: "https://httpbingo.org/anything")!
var request = URLRequest(url: url)
request.httpMethod = "POST"
request.timeoutInterval = 10
request.allHTTPHeaderFields = ["content-type": "application/json"]

let (data, _) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))