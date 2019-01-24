#!/usr/bin/env bash
set -e
if [ ! -z ${DEBUG:+X} ]; then
  set -x;
fi

export NAME=hub.mblb.net/payment-sdk-dashboard-open

build() {
  docker build . --tag ${NAME}
}

tag() {
  for TAG in "$@"; do
    docker tag ${NAME} ${NAME}:${TAG}
  done
}

push() {
  docker push ${NAME}
}

build

tag local-${DOCKER_TAG:-$(whoami)}

push
