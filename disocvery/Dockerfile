FROM openjdk:8-alpine
COPY ./target/*.jar disocvery.jar
EXPOSE 8082
ENTRYPOINT ["java","-jar","disocvery.jar"]