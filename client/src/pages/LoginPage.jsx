import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_API}/api/auth/login`, // Replace with your backend login endpoint
        { email, password }
      );

      const {token, user } = response.data; // Assuming the backend returns a JWT token and user role
      localStorage.setItem('Authorization', `${token}`);
      toast.success('Logged in successfully');

      // Redirect based on the user's role
      if (user.role === 'admin') {
        navigate('/admin/jobs'); // Replace with your admin dashboard route
      } else if (user.role === 'student') {
        if(user.isFirstLogin)
        {
          navigate('/student/new')
        }
        else
        {
          navigate('/student/dashboard')
        }
      } else {
        navigate('/'); // Default route
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center pt-16">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn bg-blue-900 text-white">
                Login
              </button>
            </div>
          </form>

          <p className="text-center mt-4">
            Don&apos;t have an account?{' '}
            <Link to='/signup' className='link link-hover'>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
