FROM swift:latest

COPY integrations/https-cert/rootCA.pem /root/integration-test.pem

# install the integration test certs
RUN apt-get update && \
  apt-get install -y ca-certificates && \
  rm -rf /var/lib/apt/lists/* && \
  cp /root/integration-test.pem /usr/local/share/ca-certificates/ && \
  update-ca-certificates

RUN apt-get update && \
  apt-get install -y nodejs npm curl && \
  npm install -g n && \
  n stable

WORKDIR /src

# add pacakge.json first so we don't have to `npm install` unless it changes
# package.json has changed
ADD package.json /src/
RUN npm install

ADD . /src

RUN for file in ./src/targets/swift/urlsession/fixtures/*.swift; do \
    cat ./src/targets/swift/urlsession/extension-for-linux.swift >> $file; \
done
