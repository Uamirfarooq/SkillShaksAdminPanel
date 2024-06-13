import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('email'); // Default to email
  const [contact, setContact] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSendVerification = async () => {
    try {
      await axiosInstance.post('/admin/send-verification', { contact });
      setStep(2);
    } catch (error) {
      console.error('Error sending verification code', error);
    }
  };

  const handleVerifyCode = async () => {
    try {
      await axiosInstance.post('/admin/verify-code', { code: verificationCode });
      setStep(3);
    } catch (error) {
      console.error('Error verifying code', error);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axiosInstance.post('/admin/reset-password', { newPassword });
      alert('Password reset successful');
      Navigate("/admin/register")
    } catch (error) {
      console.error('Error resetting password', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {step === 1 && (
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out animate-fadeIn">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Forgot Password</h1>
          <div className="mb-6 flex justify-center">
            <label className="inline-flex items-center mr-6 cursor-pointer">
              <input
                type="radio"
                name="method"
                value="email"
                checked={method === 'email'}
                onChange={() => setMethod('email')}
                className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">Email</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="radio"
                name="method"
                value="phone"
                checked={method === 'phone'}
                onChange={() => setMethod('phone')}
                className="form-radio h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
              />
              <span className="ml-2 text-gray-700">Phone</span>
            </label>
          </div>
          <input
            type="text"
            placeholder={`Enter your ${method}`}
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
          <button
            onClick={handleSendVerification}
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Send Verification Code
          </button>
        </div>
      )}
      {step === 2 && (
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out animate-fadeIn">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Verify Code</h1>
          <input
            type="text"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
          <button
            onClick={handleVerifyCode}
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Verify
          </button>
        </div>
      )}
      {step === 3 && (
        <div className="w-full max-w-sm p-8 bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out animate-fadeIn">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Reset Password</h1>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
          />
          <button
            onClick={handleResetPassword}
            className="w-full py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Reset Password
          </button>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
