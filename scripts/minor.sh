#!/usr/bin/env bash
npm test || { echo 'tests failed' ; exit 1; }
npm version minor -m "New Patch Release %s"
git push && git push --tags