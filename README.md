# Training and Placement Portal

A comprehensive MERN stack web application designed to streamline campus recruitment processes with role-based authentication and placement management system.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Sample Data Scripts](#sample-data-scripts)
- [API Documentation](#api-documentation)
- [Default Credentials](#default-credentials)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

The Training and Placement Portal is a full-stack web application that facilitates campus recruitment activities. It provides separate interfaces for administrators and students, enabling efficient job posting, application management, and placement statistics tracking.

### Key Objectives
- Digitize campus placement processes
- Provide role-based access control
- Enable efficient job posting and application management
- Generate comprehensive placement statistics
- Streamline communication between TPO and students

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication system
- Role-based access control (Admin/Student)
- Secure password hashing with bcrypt
- Protected routes and middleware
- First-login flow management

### 👨‍💼 Admin Features
- **Job Management**
  - Create, edit, and delete job postings
  - View job applications and applicant details
  - Export job data to Excel format
- **Student Management**
  - View all registered students
  - Access student profiles and academic details
  - Monitor application status
- **Placement Analytics**
  - Generate placement statistics by year and branch
  - View placement percentages and package distributions
  - Export placement reports
- **Dashboard**
  - Overview of recent activities
  - Quick access to key metrics

### 👨‍🎓 Student Features
- **Profile Management**
  - Complete academic and personal profile setup
  - Upload resume and portfolio links
  - Manage semester-wise CGPA records
- **Job Applications**
  - Browse available job opportunities
  - Apply for suitable positions
  - Track application status
- **Dashboard**
  - Personalized placement statistics
  - Recent job postings
  - Application history

### 📊 Placement Statistics
- Year-wise placement data visualization
- Branch-wise performance metrics
- Package distribution charts
- Company visit statistics
- Placement percentage calculations

## 🛠️ Technologies Used

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Chart.js** - Data visualization library
- **React Hot Toast** - Notification system
- **Lucide React** - Modern icon library
- **JWT Decode** - JWT token decoding

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing library
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **ExcelJS** - Excel file generation

### Development Tools
- **Nodemon** - Development server auto-restart
- **Git** - Version control system

## 📁 Project Structure

```
project-2024/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── admin/                   # Admin-specific components
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── AdminLayout.jsx
│   │   │   ├── JobEdit.jsx
│   │   │   └── ...
│   │   ├── components/              # Reusable components
│   │   │   ├── JobForm.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── ...
│   │   ├── pages/                   # Main page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── JobList.jsx
│   │   │   ├── JobPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── PlacementReport.jsx
│   │   │   ├── PlacementStatsPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── students/                # Student-specific components
│   │   │   ├── AppliedJobs.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── StudentDashboard.jsx
│   │   │   ├── StudentDetailsForm.jsx
│   │   │   └── StudentLayout.jsx
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── .env.sample                  # Environment variables template
│   ├── index.html                   # HTML template
│   ├── package.json                 # Dependencies and scripts
│   └── vite.config.js              # Vite configuration
│
├── server/                          # Backend Node.js application
│   ├── controllers/                 # Request handlers
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   ├── jobController.js
│   │   ├── placementController.js
│   │   └── studentController.js
│   ├── middleware/                  # Custom middleware
│   │   ├── authMiddleware.js
│   │   └── loggerMiddleware.js
│   ├── models/                      # Database schemas
│   │   ├── AdminDetails.js
│   │   ├── JobApplication.js
│   │   ├── PlacementDetails.js
│   │   ├── StudentDetails.js
│   │   └── User.js
│   ├── routes/                      # API routes
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── jobRoutes.js
│   │   ├── placementRoutes.js
│   │   └── studentRoutes.js
│   ├── scripts/                     # Utility scripts
│   │   ├── resetAdmin.js
│   │   ├── resetStudent.js
│   │   └── samplePlacementData.js
│   ├── config/
│   │   └── db.js                    # Database connection
│   ├── .env.sample                  # Environment variables template
│   ├── index.js                     # Server entry point
│   └── package.json                 # Dependencies and scripts
│
└── README.md                        # Project documentation
```

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **MongoDB** (v5.0 or higher) or MongoDB Atlas account
- **Git** (for version control)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project-2024
```

### 2. Backend Setup

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create environment file
cp .env.sample .env

# Update .env with your configuration (see Environment Configuration section)

# Create sample admin account
node scripts/resetAdmin.js reset

# Create sample student accounts
node scripts/resetStudent.js reset

# Create sample placement data
node scripts/samplePlacementData.js reset

# Start the development server
npm start
```

The backend server will start on `http://localhost:5001`

### 3. Frontend Setup

```bash
# Navigate to client directory (from project root)
cd client

# Install dependencies
npm install

# Create environment file
cp .env.sample .env

# Update .env with your configuration (see Environment Configuration section)

# Start the development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

## ⚙️ Environment Configuration

### Backend Environment Variables (.env)

```bash
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
MONGO_URL=mongodb://localhost:27017/placement-portal
# For MongoDB Atlas:
# MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/placement-portal

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend Environment Variables (.env)

```bash
# API Base URL
VITE_URL_API=http://localhost:5001
```

## 🗄️ Database Setup

The application uses MongoDB as its database. You can either:

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/placement-portal`

### Option 2: MongoDB Atlas (Recommended)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get the connection string
4. Update `MONGO_URL` in your `.env` file

### Database Schema

The application uses the following main collections:
- `users` - Authentication and user roles
- `studentdetails` - Student academic and personal information
- `admindetails` - Admin profile information
- `jobapplications` - Job postings and applications
- `placementdetails` - Placement statistics by year

## 📊 Sample Data Scripts

The project includes utility scripts to populate the database with sample data:

### Reset Admin
```bash
# Create default admin account
node scripts/resetAdmin.js reset

# Create custom admin account
node scripts/resetAdmin.js create username email password name phone
```

### Reset Students
```bash
# Create sample student accounts
node scripts/resetStudent.js reset

# Create custom student account
node scripts/resetStudent.js create username email password name branch year phone cgpa backlogs
```

### Sample Placement Data
```bash
# Create sample placement statistics
node scripts/samplePlacementData.js reset
```

## 🔗 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `PUT /api/auth/update-first-login` - Update first login status

### Job Management Endpoints
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job (Admin only)
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job (Admin only)
- `DELETE /api/jobs/:id` - Delete job (Admin only)
- `POST /api/jobs/:id/apply` - Apply for job (Student only)

### Student Management Endpoints
- `GET /api/students` - Get all students (Admin only)
- `GET /api/students/:id` - Get student by ID
- `POST /api/students` - Create student profile
- `PUT /api/students/:id` - Update student profile

### Admin Management Endpoints
- `GET /api/admin` - Get all admins (Admin only)
- `POST /api/admin` - Create admin profile
- `GET /api/admin/profile` - Get current admin profile
- `PUT /api/admin/profile` - Update current admin profile

### Placement Statistics Endpoints
- `GET /api/placement-years` - Get all placement years
- `GET /api/placement-years/:year` - Get placement data by year
- `POST /api/placement-years` - Create placement data (Admin only)
- `PUT /api/placement-years/:year` - Update placement data (Admin only)

## 🔑 Default Credentials

After running the sample data scripts, you can use these credentials to log in:

### Admin Account
- **Email:** `admin@example.com`
- **Password:** `admin123@example`

### Student Accounts
- **Email:** `john.doe@student.com` | **Password:** `student123`
- **Email:** `jane.smith@student.com` | **Password:** `student123`
- **Email:** `mike.johnson@student.com` | **Password:** `student123`
- **Email:** `sarah.wilson@student.com` | **Password:** `student123`
- **Email:** `alex.brown@student.com` | **Password:** `student123`

## 📖 Usage Guide

### For Administrators

1. **Login** with admin credentials
2. **Dashboard** - View overview of placement activities
3. **Job Management**:
   - Create new job postings
   - Edit existing jobs
   - View and manage applications
4. **Student Management**:
   - View all registered students
   - Access student profiles
5. **Placement Statistics**:
   - View year-wise placement data
   - Generate reports

### For Students

1. **Register** or **Login** with student credentials
2. **Complete Profile** - Fill in academic and personal details
3. **Browse Jobs** - View available opportunities
4. **Apply for Jobs** - Submit applications
5. **Track Applications** - Monitor application status
6. **Dashboard** - View personalized statistics



