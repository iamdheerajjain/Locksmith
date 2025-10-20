#!/bin/bash

# Build script for Password Generator Tool Docker images
# Replace 'yourusername' with your actual Docker Hub username

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
DOCKER_USERNAME="yourusername"
PROJECT_NAME="password-generator-tool"
VERSION="1.0.0"

echo -e "${GREEN}Building Password Generator Tool Docker Images${NC}"
echo -e "${YELLOW}Docker Username: ${DOCKER_USERNAME}${NC}"
echo -e "${YELLOW}Project Name: ${PROJECT_NAME}${NC}"
echo -e "${YELLOW}Version: ${VERSION}${NC}"
echo ""

# Build Backend Image
echo -e "${GREEN}Building Backend Image...${NC}"
docker build -t ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:${VERSION} .
docker build -t ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:latest .

# Build Frontend Image
echo -e "${GREEN}Building Frontend Image...${NC}"
docker build -t ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:${VERSION} ./ui/password-generator-tool
docker build -t ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:latest ./ui/password-generator-tool

echo -e "${GREEN}All images built successfully!${NC}"
echo ""
echo -e "${YELLOW}Built Images:${NC}"
echo "- ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:${VERSION}"
echo "- ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:latest"
echo "- ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:${VERSION}"
echo "- ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:latest"
echo ""
echo -e "${YELLOW}To push to Docker Hub, run:${NC}"
echo "docker push ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:${VERSION}"
echo "docker push ${DOCKER_USERNAME}/${PROJECT_NAME}-backend:latest"
echo "docker push ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:${VERSION}"
echo "docker push ${DOCKER_USERNAME}/${PROJECT_NAME}-frontend:latest"
