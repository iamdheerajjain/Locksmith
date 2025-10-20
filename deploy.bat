@echo off
echo Building the project...
call mvn clean package -DskipTests

if %ERRORLEVEL% EQU 0 (
    echo Build successful!
    
    if exist "target\*.jar" (
        echo JAR file created successfully
        echo You can now deploy the application using:
        echo   java -jar target/*.jar
        echo.
        echo Or deploy to platforms like Heroku, Railway, etc.
    ) else (
        echo Error: JAR file not found in target directory
        exit /b 1
    )
) else (
    echo Build failed!
    exit /b 1
)