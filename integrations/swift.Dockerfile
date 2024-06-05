FROM swift:latest

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