#!/usr/bin/env bash
VERSION_NUM="0.12.5"

wget https://github.com/rancher/rancher-compose/releases/download/v${VERSION_NUM}/rancher-compose-linux-amd64-v${VERSION_NUM}.tar.gz
tar zxf rancher-compose-linux-amd64-v${VERSION_NUM}.tar.gz
rm rancher-compose-linux-amd64-v${VERSION_NUM}.tar.gz
chmod +x rancher-compose-v${VERSION_NUM}/rancher-compose
sudo mv rancher-compose-v${VERSION_NUM}/rancher-compose /usr/local/bin/rancher-compose
rm -r rancher-compose-v${VERSION_NUM}