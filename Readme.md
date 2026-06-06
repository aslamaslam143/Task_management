Build a complete full-stack Task Management Web Application using the MERN Stack (MongoDB, Express.js, React.js, Node.js).

Project Requirements:

Tech Stack:

- Frontend: React.js (Vite), React Router DOM, Axios, Context API
- Backend: Node.js, Express.js
- Database: MongoDB Atlas with Mongoose
- Authentication: JWT + bcryptjs
- Deployment Ready: Vercel (Frontend) and Vercel (Backend)

Application Features:

Authentication:

- User Registration
- User Login
- User Logout
- JWT Authentication
- Protected Routes
- Password Hashing using bcryptjs
- Persistent Login using localStorage

Task Management:

- Create Task
- View All Tasks
- Update Task
- Delete Task
- Toggle Task Status (Pending / Completed)
- Task Details Modal
- Task Ownership (Users can only access their own tasks)

Task Schema:

- title
- description
- status
- dueDate
- priority (Low, Medium, High)
- userId
- timestamps

User Schema:

- name
- email
- password
- timestamps

Advanced Features:

- Search Tasks by title
- Filter Tasks by status
- Filter Tasks by priority
- Sort Tasks by newest, oldest, completed, pending
- Pagination
- Dashboard Statistics
  - Total Tasks
  - Completed Tasks
  - Pending Tasks
  - Completion Percentage

- Responsive Design
- Loading States
- Skeleton Loaders
- Toast Notifications
- Error Handling
- Empty State UI

Frontend Pages:

1. Login Page
2. Register Page
3. Dashboard Page
4. Profile Page
5. 404 Not Found Page

Frontend Components:

- Navbar
- Sidebar
- TaskCard
- TaskForm
- TaskList
- SearchBar
- FilterPanel
- Pagination
- StatisticsCards
- Loader
- Modal
- ProtectedRoute

Backend Structure:
server/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── utils/
├── services/
├── server.js

Frontend Structure:
client/
├── src/
│ ├── api/
│ ├── assets/
│ ├── components/
│ ├── context/
│ ├── hooks/
│ ├── layouts/
│ ├── pages/
│ ├── routes/
│ ├── services/
│ ├── utils/
│ └── App.jsx

Backend API Requirements:

Authentication APIs:
POST /api/auth/register
POST /api/auth/login
GET /api/auth/profile

Task APIs:
POST /api/tasks
GET /api/tasks
GET /api/tasks/:id
PUT /api/tasks/:id
DELETE /api/tasks/:id
PATCH /api/tasks/:id/status

Code Requirements:

- Use ES6 Modules
- Clean Architecture
- MVC Pattern
- Reusable Components
- Custom Hooks
- Proper Error Handling
- Environment Variables
- Validation using express-validator
- Secure Middleware
- RESTful API Standards

UI/UX Requirements:

- Modern SaaS Dashboard Design
- Professional Color Palette
- Mobile Responsive
- Smooth Animations
- Glassmorphism Cards
- Dashboard Analytics Section
- Clean Typography
- Dark/Light Mode Toggle

Generate:

1. Complete folder structure
2. All frontend files
3. All backend files
4. MongoDB models
5. Controllers
6. Routes
7. Middleware
8. JWT Authentication
9. React Context API
10. Axios API Layer
11. Full CSS Styling
12. Environment Variable Setup
13. GitHub Deployment Instructions
14. vercel Deployment Instructions
15. Vercel Deployment Instructions
16. README.md

Provide complete working code file-by-file with explanations and setup commands.
