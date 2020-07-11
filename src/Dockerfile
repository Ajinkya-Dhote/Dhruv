FROM openjdk:latest

COPY resources/disocvery-0.0.1-SNAPSHOT.jar disocvery.jar
COPY resources/gateway-0.0.1-SNAPSHOT.jar gateway.jar
COPY resources/mills-0.0.1-SNAPSHOT.jar mills.jar
COPY resources/product-0.0.1-SNAPSHOT.jar product.jar
COPY resources/user-0.0.1-SNAPSHOT.jar user.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "disocvery.jar"]