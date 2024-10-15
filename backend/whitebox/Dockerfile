# Build stage
FROM openjdk:17-jdk-slim AS builder

WORKDIR /app

# Copy necessary files for Gradle build
COPY gradlew .
COPY gradle/wrapper gradle/wrapper
RUN chmod +x ./gradlew

COPY build.gradle .
COPY settings.gradle .

# Download dependencies
RUN ./gradlew --no-daemon dependencies

# Copy source code and build the application
COPY . .
RUN chmod +x ./gradlew
RUN ./gradlew --no-daemon clean bootJar

# Runtime stage
FROM openjdk:17-jdk-slim AS runtime

# Copy built jar from builder stage
COPY --from=builder /app/build/libs/*.jar /app/app.jar

# Entry point to run the application with the 'server' profile
ENTRYPOINT ["java", "-jar", "/app/app.jar", "-Dspring.profiles.active=server"]