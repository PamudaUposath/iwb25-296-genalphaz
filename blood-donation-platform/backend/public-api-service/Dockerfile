# public-api-service/Dockerfile
FROM ballerina/ballerina:latest

WORKDIR /app
COPY . /app

# Build at image build time #NEW
RUN bal build

# Run the compiled package #NEW
CMD ["bal", "run", "target/bin/public_service.jar"]


#OLD
# Build the package
#RUN bal build

# Run the package instead of the file
#CMD ["bal", "run"]