#!/usr/bin/env bash
npm test || { echo 'tests failed' ; exit 1; }
npm version patch -m "New Patch Release %s"
git push && git push --tags