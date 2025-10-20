@echo off
REM Build script for Locksmith Docker images (Windows)
REM Replace 'yourusername' with your actual Docker Hub username

set DOCKER_USERNAME=yourusername
set PROJECT_NAME=locksmith
set VERSION=1.0.0

echo Building Locksmith Docker Images
echo Docker Username: %DOCKER_USERNAME%
echo Project Name: %PROJECT_NAME%
echo Version: %VERSION%
echo.

REM Build Backend Image
echo Building Backend Image...
docker build -t %DOCKER_USERNAME%/%PROJECT_NAME%-backend:%VERSION% .
docker build -t %DOCKER_USERNAME%/%PROJECT_NAME%-backend:latest .

REM Build Frontend Image
echo Building Frontend Image...
docker build -t %DOCKER_USERNAME%/%PROJECT_NAME%-frontend:%VERSION% ./ui/%PROJECT_NAME%
docker build -t %DOCKER_USERNAME%/%PROJECT_NAME%-frontend:latest ./ui/%PROJECT_NAME%

echo All images built successfully!
echo.
echo Built Images:
echo - %DOCKER_USERNAME%/%PROJECT_NAME%-backend:%VERSION%
echo - %DOCKER_USERNAME%/%PROJECT_NAME%-backend:latest
echo - %DOCKER_USERNAME%/%PROJECT_NAME%-frontend:%VERSION%
echo - %DOCKER_USERNAME%/%PROJECT_NAME%-frontend:latest
echo.
echo To push to Docker Hub, run:
echo docker push %DOCKER_USERNAME%/%PROJECT_NAME%-backend:%VERSION%
echo docker push %DOCKER_USERNAME%/%PROJECT_NAME%-backend:latest
echo docker push %DOCKER_USERNAME%/%PROJECT_NAME%-frontend:%VERSION%
echo docker push %DOCKER_USERNAME%/%PROJECT_NAME%-frontend:latest

pause