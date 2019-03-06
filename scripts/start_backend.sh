cd ../payment-sdk-backend-open
git pull
./mvnw clean install
cd payment-ws 
docker-compose up --build
