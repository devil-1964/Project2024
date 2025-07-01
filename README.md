# Training and Placement Portal

A MERN stack application for managing training and placement activities with role-based authentication.

## Features

- Upload Jobs
- Apply Jobs  
- Placement Statistics
- Role-based Authentication (Admin/Student)

## Setup Instructions

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.sample .env
```

4. Update `.env` with your configuration

5. Reset Admin (Create sample admin):
```bash
node scripts/resetAdmin.js
```

6. Reset Student (Create sample student):
```bash
node scripts/resetStudent.js
```

7. Create sample placement data:
```bash
node scripts/samplePlacementData.js
```

8. Start server:
```bash
npm start
```

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.sample .env
```

4. Start development server:
```bash
npm run dev
```

## Default Credentials

### Admin
- **Email:** admin@example.com
- **Password:** admin123@example

### Student  
- **Email:** john.doe@student.com
- **Password:** student123

## Scripts

- `resetAdmin.js` - Creates/resets admin user
- `resetStudent.js` - Creates/resets student user  
- `samplePlacementData.js` - Creates sample placement records