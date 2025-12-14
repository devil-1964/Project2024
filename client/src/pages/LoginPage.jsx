import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { debounce } from 'lodash';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const submitLogin = async () => {
    try {
      const response = await apiClient.post(
        '/api/auth/login',
        { email, password }
      );

      const { token, user } = response.data;
      localStorage.setItem('Authorization', token);
      localStorage.setItem('user', JSON.stringify(user));
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

  const debouncedSubmit = debounce(submitLogin, 500, { leading: true, trailing: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSubmit();
  };

  return (
    <div className="flex min-h-full items-center justify-center pt-8 ">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
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
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {/* <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label> */}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn bg-blue-900 text-white">
                Login
              </button>
            </div>
          </form>

          <p className="text-center mt-4">
            Don&apos;t have an account?{' '}
            <Link to='/signup' className='link link-hover font-semibold text-blue-900'>
              Signup
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
