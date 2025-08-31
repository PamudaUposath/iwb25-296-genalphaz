# public-api-service/Dockerfile
# public-api-service/Dockerfile
FROM ballerina/ballerina:latest

WORKDIR /app
COPY . /app





#Build the package
RUN bal build

# Run the package instead of the file
CMD ["bal", "run"]