# backend/Dockerfile

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

# Copy the built JAR file into the image
COPY target/Human_Resource_Website-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
