(require '[clj-http.client :as client])

(client/post "https://httpbin.org/anything" {:multipart [{:name "foo"
                                                          :content "Hello World"} {:name "bar"
                                                          :content "Bonjour le monde"}]})