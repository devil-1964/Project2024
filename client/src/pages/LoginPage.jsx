import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [role, setRole] = useState('student');

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success(`Logged in as ${role === 'admin' ? 'Admin' : 'Student'}`);
  };

  return (
    <div className="flex min-h-full items-center justify-center pt-16">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label"><span className='label-text'>
                Select Role</span></label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>

            <div className="form-control ">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="input input-bordered"
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
            Don't have an account?{' '}
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
