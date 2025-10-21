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

## ☁️ Deploy to Vercel (Frontend)

### Prerequisites

1. A [Vercel](https://vercel.com/) account
2. A deployed backend API (see Backend Deployment section)

### Steps

1. Fork this repository to your GitHub account
2. Log in to your Vercel dashboard
3. Click "New Project" and select your forked repository
4. Configure the project:
   - Set the **Root Directory** to: `ui/password-generator-tool`
   - The build settings should be automatically detected
5. Add environment variables:
   - `REACT_APP_API_URL`: Your deployed backend API URL (e.g., `https://your-api-domain.com/`)
6. Click "Deploy"

### Environment Variables

For local development:
- Create a `.env.development` file in `ui/password-generator-tool/` with:
  ```
  REACT_APP_API_URL=http://localhost:8080/
  ```

For production deployment:
- Set the `REACT_APP_API_URL` environment variable in your Vercel project settings

## ☁️ Deploy Backend to Cloud Platforms

### Option 1: Deploy to Heroku (Recommended for beginners)

1. Create a [Heroku](https://www.heroku.com/) account
2. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)
3. Fork this repository to your GitHub account
4. Create a new app in your Heroku dashboard
5. Connect your GitHub repository to Heroku:
   - Go to the "Deploy" tab in your Heroku app
   - Select "GitHub" as the deployment method
   - Connect your GitHub account and select your forked repository
6. Configure environment variables in Heroku:
   - Go to the "Settings" tab
   - Click "Reveal Config Vars"
   - Add the following variables:
     - `MAIL_USERNAME`: Your email address for sending emails
     - `MAIL_PASSWORD`: Your email app password (not your regular password)
7. Enable automatic deploys or manually deploy by clicking "Deploy Branch"

### Option 2: Deploy to Railway

1. Create a [Railway](https://railway.app/) account
2. Fork this repository to your GitHub account
3. Create a new project in Railway
4. Select "Deploy from GitHub repo"
5. Choose your forked repository
6. Railway will automatically detect this is a Java/Maven project
7. Add environment variables:
   - `MAIL_USERNAME`: Your email address for sending emails
   - `MAIL_PASSWORD`: Your email app password
8. Deploy the application

### Option 3: Deploy using Docker

You can deploy the Docker image to any cloud platform that supports containers:

1. Build the Docker image:
   ```bash
   docker build -t locksmith-backend .
   ```

2. Push to a container registry (Docker Hub, AWS ECR, etc.)

3. Deploy to your preferred platform:
   - AWS ECS
   - Google Cloud Run
   - Azure Container Instances
   - DigitalOcean Apps
   - etc.

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
mvn clean package
cd ui/password-generator-tool
npm run build
cd ../..
docker-compose -f docker-compose.dev.yml up -d
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
- `MAIL_USERNAME` - Email address for sending emails
- `MAIL_PASSWORD` - Email app password (not your regular password)

**Health Checks:**
- Backend: `http://localhost:8080/actuator/health`
- Frontend: `http://localhost:3000`

## 🛠 Troubleshooting

**Common Issues:**
- **Port conflicts**: Ensure ports 3000 and 8080 are available
- **Build failures**: Check Docker daemon is running
- **Network issues**: Ensure Docker networks are properly configured
- **Email configuration**: Make sure MAIL_USERNAME and MAIL_PASSWORD are set correctly

**View Logs:**
```bash
# View all logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```
