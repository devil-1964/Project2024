import  { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupPage = () => {
  const [rollNo, setRollNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Automatically set role to "student"
      const role = 'student';

      const response = await axios.post(
        `${import.meta.env.VITE_URL_API}/api/auth/register`, // Replace with your backend signup endpoint
        { username: rollNo, email, password, role } // Send Roll No as username
      );

      if (response.status === 201) {
        toast.success('Signup successful! Redirecting to login page...');
        navigate('/login'); // Redirect to login page after successful signup
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex  items-center justify-center pt-8 ">
      <div className="card w-full max-w-sm shadow-2xl  bg-base-100">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Roll No</span>
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
            <div className="form-control mt-2">
              <button type="submit" className="btn bg-blue-900 text-white">
                Signup
              </button>
            </div>
          </form>
          <p className="text-center mt-4">
            Already have an account?{' '}
            <Link to='/login' className='link link-hover'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
