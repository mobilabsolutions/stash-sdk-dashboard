#!/bin/bash

# global resource variables
export KUBE_NAMESPACE="demo"
export KUBE_APPLY_DATE="`date +%s`"

# deployment variables
export KUBE_DEPLOYMENT_CPU_REQUEST="500m"
export KUBE_DEPLOYMENT_CPU_LIMIT="1"
export KUBE_DEPLOYMENT_MEMORY_LIMIT="300Mi"
export KUBE_DEPLOYMENT_MEMORY_REQUEST="128Mi"
export KUBE_DEPLOYMENT_REPLICA_COUNT="1"
export KUBE_DEPLOYMENT_IMAGE_TAG=${TRAVIS_TAG}

# configmap variables
export KUBE_CONFIGMAP_API_UPSTREAM="payment-sdk-backend"
export KUBE_CONFIGMAP_PORT="3000 default"
export KUBE_CONFIGMAP_SDK_ENV="development"

# service variables

# ingress variables