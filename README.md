# Student Portal Application

**Name:** Aye Khin Khin Hpone  
**ID:** 125970

Full-stack web application built with Angular frontend, Node.js/Express backend, MongoDB database, and WebSocket real-time communication.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (running on localhost:27017)
- npm or yarn package manager

## Project Structure

```
/angularApp     - Angular frontend application
/backend        - Node.js/Express backend API
/reactApp       - React frontend (alternative)
/deploy         - Docker deployment configuration
```

## Backend Setup

```bash
cd backend
npm install
npm start
```

Backend runs on http://localhost:3000

### API Endpoints

**Authentication (Public)**
- POST /users/login - User login
- POST /users/register - User registration

**Projects (Protected)**
- GET /projects - List all projects (requires auth)
- GET /projects/public - Public projects (no auth)
- POST /projects/create - Create project (requires auth)

**WebSocket**
- ws://localhost:3000 - Real-time chat server

## Angular Frontend Setup

```bash
cd angularApp
npm install
ng serve
```

Frontend runs on http://localhost:4200

### Features

- User authentication (login/signup/logout)
- Protected routes with auth guards
- Project management with random project picker
- Real-time WebSocket chat with user email prefixes
- Unit tests for components

### Key Routes

- `/login` - Login/Signup page
- `/projects` - Projects list (protected)
- `/chat` - WebSocket chat (protected)
- `/contact` - Contact page (public)

## Authentication

The application uses JWT tokens stored in localStorage. Protected routes require valid token in Authorization header as Bearer token.

## Testing

```bash
cd angularApp
npm test
```

## Database Models

**User Schema**
- email: String (required, unique)
- password: String (hashed with bcrypt)

## Environment Variables

Backend uses default configuration:
- MongoDB: mongodb://localhost:27017
- Port: 3000
- JWT Secret: jwtsecretkey

## Running with Docker

```bash
cd deploy
docker-compose up
```
