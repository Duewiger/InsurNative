# InsurNative

**InsurNative** is a mobile application developed using **Django** for the backend and **React Native** for the frontend. The core functionality allows users to upload and manage their insurance documents, translate content using AI-powered services, and communicate with their insurance advisors. The app leverages modern technologies such as AWS for hosting and storage, JWT for secure authentication, and Expo for building and deploying the mobile frontend.

---

## Table of Contents
1. [Key Features](#key-features)
2. [Technology Stack](#technology-stack)
3. [Installation and Setup](#installation-and-setup)
4. [Roadmap](#roadmap)
5. [Contributing](#contributing)
6. [License](#license)

---

## Key Features

- **User Authentication & Management**: Secure login and registration powered by Django and JWT.
- **Document Translation**: Users can upload insurance documents and use AI (ChatGPT) to translate them, which is then saved as a PDF.
- **Advisor Communication**: Users can contact their advisors, and advisors receive the messages via email.
- **CRUD Operations**: Full support for creating, reading, updating, and deleting user-uploaded documents.
- **Cloud Integration**: Storage of media and static files using AWS S3, with deployment via AWS ECS, EC2, RDS, and Route53.
- **Expo-based Mobile Frontend**: Available on the Google Play Store, providing a seamless experience across Android devices.

---

## Technology Stack

### Backend (Django)
- **Framework**: Django, Django Rest Framework
- **Authentication**: JWT via `rest_framework_simplejwt`
- **Database**: PostgreSQL
- **Cloud**: AWS (S3, ECS, EC2, RDS, Load Balancer, Route53)
- **Security**: Axes for brute-force protection, SSL, HSTS, CSRF, CORS policies
- **Email**: SendGrid for email notifications

### Frontend (React Native)
- **Mobile Framework**: React Native with Expo
- **Navigation**: React Navigation
- **State Management**: Redux
- **API Integration**: REST APIs powered by Django backend

### DevOps
- **Containerization**: Docker
- **CI/CD**: Planned integration with GitHub Actions
- **Monitoring**: Sentry (planned for future updates)

---

## Installation and Setup

To set up the project locally:

### Backend (Django)
1. Clone the repository: 
   ```bash
   git clone https://github.com/your-username/insurnative-backend.git
   cd insurnative-backend
   ```
2. Create a `.env` file based on the `.env.example`.
3. Set up Docker and run the containers:
   ```bash
   docker-compose up --build
   ```
4. Migrate the database:
   ```bash
   docker-compose exec web python manage.py migrate
   ```

### Frontend (React Native)
1. Clone the frontend repository:
   ```bash
   git clone https://github.com/your-username/insurnative-frontend.git
   cd insurnative-frontend
   ```
2. Install dependencies and run the app:
   ```bash
   npm install
   expo start
   ```

---

## Roadmap

### 2024 - Phase 1
- **API Performance Optimization**
  - Implement caching (Memcached, Redis) to reduce API response time.
  - Centralize API logic to improve code reusability.
  - Code splitting to enhance modularity.
  
- **Security Enhancements**
  - Integrate Multi-Factor Authentication (MFA).
  - Fully integrate Nginx as a reverse proxy for enhanced security.

- **Code Improvements**
  - Adopt DRY principles in React components.
  - Optimize use of React hooks for state management.
  - Refactor styling to move away from inline styles.

- **Logging & Monitoring**
  - Improve logging setup with Sentry for error tracking.
  - Enhance development and production logging.

- **Unit Testing & CI/CD**
  - Establish comprehensive unit tests across frontend and backend.
  - Implement CI/CD pipelines using GitHub Actions for automatic testing and deployment.

### 2024 - Phase 2
- **Feature Improvements**
  - Add advisor management tools, such as automated email reports.
  - Optimize the translation feature to support more languages and document types.

- **Platform Expansion**
  - Improve mobile compatibility with iOS.
  - Optimize the app for tablet devices.

---

## Contributing

We welcome contributions to InsurNative! To contribute, please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Create a new Pull Request.

Please make sure to adhere to the existing code style and include appropriate tests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---