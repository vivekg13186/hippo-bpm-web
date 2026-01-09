# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:17-jdk

# Set the working directory inside the container
WORKDIR /app

VOLUME /data

# Copy the Spring Boot JAR file into the container
COPY hippo-bpm.jar hippo-bpm.jar

# Expose the port your Spring Boot app runs on (default 8080)
EXPOSE 8080

# Run the JAR file
ENTRYPOINT ["java", "-jar", "hippo-bpm.jar"]

# docker build -t hippo-bpm .
# docker run -d  -p 8080:8080  -v hippo-h2-data:/data --name hippo-bpm hippo-bpm