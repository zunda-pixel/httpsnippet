
import FoundationNetworking

extension URLSession {
  func data(for request: URLRequest, delegate: (any URLSessionTaskDelegate)? = nil) async throws -> (Data, URLResponse) {
    return try await withCheckedThrowingContinuation { continuation in
      self.dataTask(with: request) { data, response, error in
        if let error {
          continuation.resume(throwing: error)
        } else {
          continuation.resume(returning: (data!, response!))
        }
      }
      .resume()
    }
  }
}
