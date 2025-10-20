#!/bin/bash

# Build the project
echo "Building the project..."
mvn clean package -DskipTests

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful!"
    
    # Check if target directory exists and contains the jar file
    if [ -f "target/*.jar" ]; then
        echo "JAR file created successfully"
        echo "You can now deploy the application using:"
        echo "  java -jar target/*.jar"
        echo ""
        echo "Or deploy to platforms like Heroku, Railway, etc."
    else
        echo "Error: JAR file not found in target directory"
        exit 1
    fi
else
    echo "Build failed!"
    exit 1
fi