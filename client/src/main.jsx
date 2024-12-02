import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import "./index.css"
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import PlacementStatsPage from './pages/PlacementStatsPage';
import StudentDashboard from './students/StudentDashboard';
import JobPage from './pages/JobPage';
import JobApplicationForm from './components/JobApplicationForm';
import AdminLayout from './layouts/AdminLayout';
import JobForm from './components/JobForm';
import StudentLayout from './layouts/StudentLayout';
import { Toaster } from 'react-hot-toast';
import JobEdit from './admin/JobEdit';
import Profile from './students/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/team',
        element: <TeamPage />,
      },
      {
        path: '/contact-us',
        element: <ContactPage />,
      },
      {
        path: '/placement-statistics',
        element: <PlacementStatsPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/signup',
        element: <SignupPage />,
      },
    ],
  },
  {
    path: 'admin',  // Use relative path here
    element: <AdminLayout />,
    children: [
      {
        path: 'jobs',  // This is now relative to '/admin'
        element: <JobPage />,
      },
      {
        path: 'job-forms',  // This is now relative to '/admin'
        element: <JobForm />,
      },
      {
        path: 'jobs/edit/:id',  // This is now relative to '/admin'
        element: <JobEdit />,
      },
    ],
  },
  {
    path: 'student',  // Use relative path here
    element: <StudentLayout />,
    children: [
      {
        path: 'jobs',  // This is now relative to '/admin'
        element: <JobPage />,
      },
      {
        path: 'profile',  // This is now relative to '/admin'
        element: <Profile />,
      },
      {
        path: 'apply/:id',  // This is now relative to '/admin'
        element: <JobApplicationForm />,
      },
      {
        path: 'dashboard',
        element: <StudentDashboard/>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster
                position="bottom-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: 'lightblue',
                        color: 'black',
                        borderRadius: '8px',
                        padding: '8px',
                    },
                }}
            />
  </React.StrictMode>
);
