#!/bin/bash

cd ${HOME} && { curl -sL https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-sdk-207.0.0-linux-x86_64.tar.gz | tar xz; ./google-cloud-sdk/install.sh --quiet; cd -; };
source ${HOME}/google-cloud-sdk/path.bash.inc
curl -Lo kubectl https://storage.googleapis.com/kubernetes-release/release/v1.11.0/bin/linux/amd64/kubectl && chmod +x kubectl && sudo mv kubectl /usr/local/bin/