# Swift on Ubuntu 20.04
FROM swift:latest

RUN openssl x509 -outform der -in integrations/https-cert/rootCA.pem -out integrations/https-cert/rootCA.crt
COPY integrations/https-cert/rootCA.crt /usr/local/share/ca-certificates/integration-test.crt
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