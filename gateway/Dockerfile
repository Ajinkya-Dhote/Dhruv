FROM openjdk:8-alpine
COPY ./target/*.jar gateway.jar
EXPOSE 8081
ENTRYPOINT ["java","-jar","gateway.jar"]