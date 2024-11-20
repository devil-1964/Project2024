// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import RootLayout from './layouts/RootLayout';
import "./index.css"
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import ContactPage from './pages/ContactPage';
import PlacementStatsPage from './pages/PlacementStatsPage';


const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/dashboard',
        element: <App />,
      },
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
