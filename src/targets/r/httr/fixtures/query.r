library(httr)

url <- "https://httpbin.org/anything"

queryString <- list(
  foo = "bar,baz",
  baz = "abc"
)

response <- VERB("GET", url, query = queryString, content_type("application/octet-stream"))

content(response, "text")