# Swift on Ubuntu 20.04
FROM swift:latest

COPY integrations/https-cert/rootCA.pem /tmp/integration-test.pem
RUN openssl x509 -outform der -in /tmp/integration-test.pem -out /tmp/integration-test.crt
RUN cp /tmp/integration-test.crt /usr/local/share/ca-certificates/integration-test.crt
RUN update-ca-certificates

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