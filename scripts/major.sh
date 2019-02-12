#!/usr/bin/env bash
npm test || { echo 'tests failed' ; exit 1; }
npm version major -m "New major Release %s"
git push && git push --tags