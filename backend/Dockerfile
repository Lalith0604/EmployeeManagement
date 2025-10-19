
# Use Maven + JDK 21 to build the app
FROM maven:3.9.6-eclipse-temurin-21 AS build
WORKDIR /app

# Copy project files
COPY pom.xml .
COPY src ./src

# Build without running tests
RUN mvn clean package -DskipTests

# Use JDK 21 for runtime
FROM eclipse-temurin:21-jdk
WORKDIR /app

# Copy the built jar
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
