import Foundation

let url = URL(string: "https://httpbin.org/anything")!
var components = URLComponents(url: url, resolvingAgainstBaseURL: true)!
let queryItems: [URLQueryItem] = [
  URLQueryItem(name: "startTime", value: "2019-06-13T19:08:25.455Z"),
  URLQueryItem(name: "endTime", value: "2015-09-15T14:00:12-04:00"),
]
components.queryItems = components.queryItems.map { $0 + queryItems } ?? queryItems

var request = URLRequest(url: components.url!)
request.httpMethod = "GET"
request.timeoutInterval = 10

let (data, _) = try await URLSession.shared.data(for: request)
print(String(decoding: data, as: UTF8.self))