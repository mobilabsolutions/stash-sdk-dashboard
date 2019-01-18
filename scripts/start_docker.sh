#!/usr/bin/env bash
docker stop payment-sdk-dashboard
docker rm payment-sdk-dashboard
docker build . -t payment-sdk-dashboard
docker run --name payment-sdk-dashboard_01 --env PORT=5000 -p 5000:5000 -d payment-sdk-dashboard
echo Server is running on http://localhost:5000