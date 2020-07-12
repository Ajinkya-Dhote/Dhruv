FROM openjdk:8-alpine
COPY ./target/*.jar product.jar
EXPOSE 8084
ENTRYPOINT ["java","-jar","product.jar"]