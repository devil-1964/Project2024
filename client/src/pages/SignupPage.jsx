import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { debounce } from 'lodash';

const SignupPage = () => {
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  // Role is fixed to student per backend model
  const role = 'student';
  const navigate = useNavigate();

  const submitSignup = async () => {
    try {
      const response = await apiClient.post(
        '/api/auth/register',
        { username: rollNo, email, password, role, phone }
      );

      if (response.status === 201) {
        toast.success('Signup successful! Redirecting to login page...');
        navigate('/login');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  const debouncedSubmit = debounce(submitSignup, 700, { leading: true, trailing: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    debouncedSubmit();
  };

  return (
    <div className="flex  items-center justify-center pt-8 ">
      <div className="card w-full max-w-sm shadow-2xl  bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Roll No</span>
              </label>
              <input
                type="text"
                placeholder="Enter your roll number"
                className="input input-bordered"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Phone (optional)</span>
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="input input-bordered"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
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
            {/* Role selection removed; default is student */}
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
            <div className="form-control mt-2">
              <button type="submit" className="btn bg-blue-900 text-white ">
                Signup
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to='/login' className='link link-hover font-semibold text-blue-900'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
