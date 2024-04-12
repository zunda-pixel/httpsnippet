import Foundation

let url = URL(string: "http://httpbin.org/anything")!
var request = URLRequest(url: url)
request.httpMethod = "GET"
request.timeoutInterval = 10

let (data, _) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))