# Portfolio Website

A modern, responsive portfolio website built with the MERN stack.

## Features

- Responsive design (mobile and desktop)
- Dark/light mode
- Pages: Home, Profile, Projects, Resume
- MERN Stack (MongoDB, Express, React, Node.js)
- TypeScript for type safety
- Tailwind CSS for styling

## Technologies Used

### Frontend
- React.js with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- Axios for API requests
- React Icons

### Backend
- Node.js with Express.js
- MongoDB for database
- Mongoose ODM
- Cors for cross-origin requests
- Dotenv for environment variables

## Project Structure

```
portfolio/
├── backend/              # Backend code
│   ├── src/             
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   └── routes/       # API routes
│   ├── .env              # Environment variables
│   ├── package.json      # Backend dependencies
│   └── server.txt        # Express server setup
│
└── frontend/             # Frontend code
    ├── src/
    │   ├── api/          # API service functions
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── types/        # TypeScript types
    │   └── uploads/      # Upload directory
    ├── .env              # Environment variables
    ├── index.html        # HTML entry
    ├── package.json      # Frontend dependencies
    ├── tailwind.config.js # Tailwind configuration
    └── vite.config.ts    # Vite configuration
```

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- npm or yarn
- MongoDB instance

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd portfolio
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/portfolio
   NODE_ENV=development
   ```

4. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

5. Create a `.env` file in the frontend directory with the following variables:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```

### Running the Application

1. Start the backend server
   ```
   cd backend
   npm start
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## Deployment

### Frontend
- Build the frontend: `cd frontend && npm run build`
- Deploy the generated `dist` folder to a static hosting service like Vercel, Netlify, or GitHub Pages

### Backend
- Deploy to a Node.js hosting service like Heroku, Render, or DigitalOcean

## License
MIT 