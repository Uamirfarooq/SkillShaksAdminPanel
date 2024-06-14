import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../Feature/auth/authSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setIsButtonDisabled(!(email && password));
  }, [email, password]);

  const handleSignIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post('/auth/admin/login', {
        email,
        password
      });
      const { accessToken, refreshToken, user } = response.data.data;

      localStorage.setItem("accessToken", JSON.stringify(accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(refreshToken));

      dispatch(loginSuccess({ user, accessToken, refreshToken }));

      navigate('/');
    } catch (error) {
      console.error('Error sending data:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div className='bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8'>
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form className="space-y-6" onSubmit={handleSignIn}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium leading-6">Email address</label>
        <div className="mt-2">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="block text-sm font-medium leading-6">Password</label>
          <div className="text-sm">
            <Link to="/forget-password" className="font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</Link>
          </div>
        </div>
        <div className="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-500 sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${isButtonDisabled ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' : 'bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-500 dark:hover:bg-indigo-400 focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-500'}`}
          disabled={isButtonDisabled}
        >
          Sign in
        </button>
      </div>
    </form>

    <p className="mt-10 text-center text-sm">
      Not a member? Contact Admin Support Or 
      <Link to="/" className="font-semibold leading-6 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"> Home Page</Link>
    </p>

    <div className="mt-6 text-center">
    </div>
  </div>
</div>

  );
}

export default LoginPage;
