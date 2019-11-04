#!/usr/bin/env bash
set -e
if [ ! -z ${DEBUG:+X} ]; then
  set -x;
fi

PROJECT_ID="mobilabsolutions/payment-sdk-dashboard-open"
REGISTRY="docker.pkg.github.com"

docker login ${REGISTRY} -u ${DOCKER_USER} -p ${DOCKER_TOKEN}

IMAGE_NAME="payment-dashboard"
BASE_IMAGE=${REGISTRY}/${PROJECT_ID}/${IMAGE_NAME}
INITIAL_IMAGE=${BASE_IMAGE}:commit-${TRAVIS_COMMIT}

build() {
  echo "Building ${INITIAL_IMAGE}"
  docker build -t ${INITIAL_IMAGE} ${TRAVIS_BUILD_DIR}
  echo "Building ${NOTIFICATION_INITIAL_IMAGE}"
}

tag() {
  for TAG in "$@"; do
    echo "Tagging ${BASE_IMAGE}:${TAG}"
    docker tag ${INITIAL_IMAGE} ${BASE_IMAGE}:${TAG}
  done
}

push() {
  echo "Pushing tags for ${BASE_IMAGE}"
  docker push ${BASE_IMAGE}
}

build

if echo ${TRAVIS_PULL_REQUEST} | egrep '[[:digit:]]+'; then
  tag pr-${TRAVIS_PULL_REQUEST} build-${TRAVIS_BUILD_NUMBER} commit-${TRAVIS_COMMIT}
else
  if [[ ${TRAVIS_BRANCH:-X} == 'master' ]]; then
    tag latest build-${TRAVIS_BUILD_NUMBER} commit-${TRAVIS_COMMIT}
  fi
fi

if [[ ! -z ${TRAVIS_TAG:+X} ]]; then
  tag ${TRAVIS_TAG} build-${TRAVIS_BUILD_NUMBER} commit-${TRAVIS_COMMIT}
fi

push
