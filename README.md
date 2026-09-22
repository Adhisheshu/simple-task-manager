# Simple Task Manager

A small full-stack Task Manager built for the supplied Fullstack Software Engineer Test.

## Stack
- Frontend: Angular 18, TypeScript, Reactive Forms
- Backend: Java 17, Spring Boot 3.5, Spring Data JPA/Hibernate
- Database: H2 in-memory
- API: REST

## Project structure
```text
simple-task-manager/
├── frontend/
└── backend/
```

## Backend setup
Requirements: Java 17+ and Maven 3.9+.

```bash
cd backend
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`.

Endpoints:
- `POST /api/tasks`
- `GET /api/tasks`

H2 console:
- `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:taskdb`
- User: `sa`
- Password: blank

## Frontend setup
Requirements: Node.js 20+ and npm.

```bash
cd frontend
npm install
npm start
```

Open `http://localhost:4200`.

The Angular development server proxies `/api` requests to Spring Boot on port 8080.

## What is implemented
- Required title validation
- Optional description
- Create task through Angular -> REST API -> JPA -> H2
- List all tasks
- Automatic `createdAt` timestamp
- DTO/entity separation
- Service and repository layers
- Global backend validation/error response
- Graceful Angular API error message
- Responsive, clean UI

## Design choices
The backend keeps the controller thin and follows:
`Controller -> Service -> Repository -> H2`

DTOs are used at the API boundary so persistence entities are not exposed directly.

With more time, useful additions would include update/delete, pagination, automated frontend tests, backend integration tests, persistent database configuration, authentication, and CI.
