# Spaced Repetition API

A NestJS-based API for managing spaced repetition lessons and revisions. The API follows Domain-Driven Design (DDD) principles and uses TypeScript, Prisma, and PostgreSQL. It is containerized with Docker for easy setup and deployment.

## Project Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or later)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 2. Environment Variables
Copy the provided `.env.example` file to `.env` and configure your environment variables:
```bash
cp .env.example .env
```

### 3. Create a Database (if you do not have a running instance of a PostgreSQL DB)
Use Docker Compose to start the PostgreSQL database:
```bash
docker-compose up
```

### 4. Create the Databse Schema
Use Prisma migrations to create the required tables:
```bash
yarn prisma migrate dev 
```

### 5. Run the Application
To start the API server:
```bash
yarn start:dev
```

## Testing
Run the test suite with the following command:
```bash
yarn test
```

## Technologies
- **Framework**: [NestJS](https://nestjs.com/)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: [Prisma](https://www.prisma.io/)
- **Containerization**: Docker

## Project Structure
This project follows the principles of Domain-Driven Design (DDD). The structure includes:

- **Domain**: Contains core business logic and rules.
- **Application**: Contains use cases and application services.
- **Infrastructure**: Handles external interactions (e.g., database, APIs).
- **Interfaces**: Handles HTTP controllers and user interaction.

## Features

### 1. Create a Lesson
**POST** `/lessons`

Creates a new lesson with the provided details.

#### Request Body:
```json
{
  "subject": "string",         // Required
  "theme": "string",           // Required
  "tags": ["string"],          // Optional
  "date": "ISO 8601 string",  // Optional
  "course": "string",         // Optional
  "references": ["string"]    // Optional
}
```

### 2. Get Revisions for a Specific Date
**GET** `/revisions/:date`

Retrieves all lessons scheduled for revision on the specified date.

#### Path Parameters:
- `date`: (string) ISO 8601 date. Required.

### 3. Toggle Revision Completion
**PATCH** `/revisions/completion/:revisionId`

Toggles the "completed" status of a specific revision.

#### Path Parameters:
- `revisionId`: (string) UUID of the revision. Required.

### 4. Edit a Lesson
**PUT** `/lesson/:lessonId`

Updates the details of an existing lesson.

#### Path Parameters:
- `lessonId`: (string) UUID of the lesson. Required.

#### Request Body:
```json
{
  "subject": "string",         // Optional
  "theme": "string",           // Optional
  "tags": ["string"],          // Optional
  "date": "ISO 8601 string",  // Optional
  "course": "string",         // Optional
  "references": ["string"]    // Optional
}
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
