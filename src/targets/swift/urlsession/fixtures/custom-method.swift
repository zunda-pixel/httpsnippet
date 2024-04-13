import Foundation

let url = URL(string: "https://httpbin.org/anything")!
var request = URLRequest(url: url)
request.httpMethod = "PROPFIND"
request.timeoutInterval = 10

do {
  let (data, _) = try await URLSession.shared.data(for: request)
  print(String(decoding: data, as: UTF8.self))
} catch {
  print(error, error.localizedDescription)
}
