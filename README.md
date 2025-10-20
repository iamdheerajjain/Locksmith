# Locksmith 🔐

[![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white)](https://www.java.com/)

A modern, secure password generator with customizable options and email delivery. Create strong, unique passwords with ease and send them directly to your email.

## ✨ Key Features

- **Customizable Passwords** - Include uppercase, lowercase, numbers, and special characters
- **Length Control** - Generate passwords up to 24 characters long
- **Password Strength** - Real-time strength verification
- **Email Delivery** - Send passwords directly to your inbox
- **Dockerized** - Easy deployment with Docker
- **Modern UI** - Clean, responsive interface with dark mode support

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed

### Run with Docker Compose (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd locksmith

# Start the application
docker-compose build --no-cache
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
```

To stop the application:
```bash
docker-compose down
```



## 👨‍💻 Development

### Local Development

**Backend (Spring Boot):**
```bash
# Requires Java 17 and Maven
mvn clean install
mvn spring-boot:run
# Access at http://localhost:8080
```

**Frontend (React):**
```bash
cd ui/password-generator-tool
npm install
npm run dev
# Access at http://localhost:3000
```

### Development with Docker

```bash
# Start development environment with hot reload
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f
```

## 🐳 Docker

### Build Images

Replace `yourusername` with your Docker Hub username in the build scripts:

```bash
# Linux/Mac
./build-docker-images.sh

# Windows
build-docker-images.bat
```

### Publish Images

```bash
# Login to Docker Hub
docker login

# Push images (Linux/Mac)
./build-docker-images.sh

# Push images (Windows)
docker push yourusername/locksmith-backend:latest
docker push yourusername/locksmith-frontend:latest
```

**Available Images:**
- `yourusername/locksmith-backend:latest` - Spring Boot API
- `yourusername/locksmith-frontend:latest` - React Frontend

## 🛠 API Endpoints

- `POST /` - Generate password with custom parameters
- `POST /suggest` - Generate a very strong suggested password
- `POST /verifier` - Check password strength
- `POST /mail` - Send password via email
- `POST /email-config` - Save email configuration
- `GET /email-config` - Get email configuration
- `GET /email-config/status` - Check if email is configured
- `GET /history` - Get password history
- `DELETE /history` - Clear password history
- `GET /templates` - Get password templates
- `POST /template/{templateName}` - Generate password from template
- `POST /expiration` - Add password expiration reminder
- `GET /expiration` - Get password expirations
- `GET /expiration/upcoming` - Get upcoming expirations
- `DELETE /expiration` - Clear password expirations
- `GET /export/history/pdf` - Export history to PDF
- `GET /export/history/csv` - Export history to CSV
- `GET /export/expiration/pdf` - Export expirations to PDF
- `GET /export/expiration/csv` - Export expirations to CSV

## ⚙️ Configuration

**Environment Variables:**
- `SPRING_PROFILES_ACTIVE` - Spring profile (docker, dev, prod)
- `SERVER_PORT` - Server port (default: 8080)

**Health Checks:**
- Backend: `http://localhost:8080/actuator/health`
- Frontend: `http://localhost:3000`

## 🛠 Troubleshooting

**Common Issues:**
- **Port conflicts**: Ensure ports 3000 and 8080 are available
- **Build failures**: Check Docker daemon is running
- **Network issues**: Ensure Docker networks are properly configured

**View Logs:**
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```