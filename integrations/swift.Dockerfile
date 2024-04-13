FROM swift:latest

COPY integrations/https-cert/rootCA.pem /tmp/rootCA.pem
RUN openssl x509 -outform der -in /tmp/rootCA.pem -out /tmp/rootCA.crt
#RUN cp /tmp/rootCA.crt /usr/local/share/ca-certificates/integration-test.crt
RUN update-ca-certificates --fresh

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