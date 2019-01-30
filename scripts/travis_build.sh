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
  docker login -u docker-user -p ${DOCKER_MBLB_PASSWORD} hub.mblb.net
  docker push ${NAME}
}

build

if [ ! -z ${TRAVIS_BUILD_NUMBER:+X} ]; then
  tag build-${TRAVIS_BUILD_NUMBER}
fi

if [ ! -z ${BUILD_NUMBER:+X} ]; then
  tag build-${BUILD_NUMBER}
fi

if [ ! -z ${TRAVIS_COMMIT:+X} ]; then
  tag commit-${TRAVIS_COMMIT}
fi

if [ ! -z ${TRAVIS_JOB_NUMBER:+X} ]; then
  tag job-${TRAVIS_JOB_NUMBER}
fi

if [ ! -z ${BUILD_TAG:+X} ]; then
  tag ${BUILD_TAG}
fi

if echo ${TRAVIS_PULL_REQUEST} | egrep '[[:digit:]]+'; then
  tag pr-${TRAVIS_PULL_REQUEST}
  if [ ! -z ${TRAVIS_PULL_REQUEST_BRANCH:+X} ]; then
    tag ${TRAVIS_PULL_REQUEST_BRANCH}
  fi
else
  if [ ! -z ${TRAVIS_BRANCH:+X} ]; then
    tag ${TRAVIS_BRANCH}
  fi
fi

if echo ${gitlabMergeRequestIid} | egrep '[[:digit:]]+'; then
  tag mr-${gitlabMergeRequestIid}
  if [ ! -z ${gitlabMergeRequestLastCommit:+X} ]; then
    tag ${gitlabMergeRequestLastCommit}
  fi
fi

if [ ! -z ${gitlabBranch:+X} ]; then
  tag $(echo ${gitlabBranch} | sed 's/^refs\/tags\///g')
fi

if [ ! -z ${TRAVIS_TAG:+X} ]; then
  tag ${TRAVIS_TAG}
fi

push