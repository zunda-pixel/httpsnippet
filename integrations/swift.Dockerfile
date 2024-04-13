FROM node:18-alpine

COPY integrations/https-cert/rootCA.pem /root/integration-test.pem

# install the integration test certs
RUN apk --no-cache add ca-certificates curl && \
  rm -rf /var/cache/apk/* && \
  cp /root/integration-test.pem /usr/local/share/ca-certificates/ && \
  update-ca-certificates

# install Swiftly and install Swift
RUN curl -L https://swift-server.github.io/swiftly/swiftly-install.sh && \
  ./swiftly-install.sh --disable-confirmation && \
  swiftly install latest

WORKDIR /src

ADD package.json /src/

RUN npm install

ADD . /src

RUN for file in ./src/targets/swift/urlsession/fixtures/*.swift; do \
      cat ./src/targets/swift/urlsession/extension-for-linux.swift >> $file; \
    done
