#!/usr/bin/env bash
npm test || { echo 'tests failed' ; exit 1; }
npm version minor -m "New minor Release %s"
git push && git push --tags