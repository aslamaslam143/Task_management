# TaskFlow - Modern Task Management System

A premium SaaS-style Task Management application built with the MERN Stack.

## Features

- **Full Auth**: Secure registration and login with JWT and Bcrypt.
- **Task Management**: CRUD operations, toggle status, and detailed task cards.
- **Dashboard Analytics**: Visualized statistics for total, completed, and pending tasks.
- **Advanced Filtering**: Search by title, filter by status/priority, and sort by date.
- **Responsive Design**: Optimized for both mobile and desktop views.
- **Premium UI**: Dark mode with glassmorphism effects and smooth animations.

## Tech Stack

- **Frontend**: React (Vite), Axios, Context API, Lucide Icons, Vanilla CSS
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT
- **Middleware**: Custom Auth Middleware, Error Handling

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB installed locally or a MongoDB Atlas URI

### Setup Instructions

1. **Clone the repository** (or unzip the files).
2. **Setup Backend**:
   - Navigate to `server/`
   - Run `npm install`
   - Create/Update `.env` file with your `MONGO_URI` and `JWT_SECRET`.
   - Run `npm start` (or `node server.js`)
3. **Setup Frontend**:
   - Navigate to `client/`
   - Run `npm install`
   - Run `npm run dev`
4. **Access the App**:
   - Open `http://localhost:5173` (Vite default) or the port shown in the terminal.

## API Endpoints

### Auth
- `POST /api/auth/register` - Create a new user
- `POST /api/auth/login` - Login user and get token
- `GET /api/auth/profile` - Get user profile (Protected)

### Tasks
- `GET /api/tasks` - Get all user tasks (with search/filter/pagination)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get task details
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/status` - Toggle completion status
- `GET /api/tasks/stats` - Get dashboard statistics
