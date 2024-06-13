import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserProfilePage = () => {

  const { state } = useLocation();
  const { user } = state;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-2">
      <div className="w-full h-52 bg-cover bg-center rounded-lg" style={{ backgroundImage: 'url(https://via.placeholder.com/1200x400)' }}></div>
      <div className="w-24 h-24 bg-cover bg-center rounded-full mt-[-25px] border-4 border-white" style={{ backgroundImage: `url(${user.profileImg})` }}></div>
      <div className="flex flex-col items-center mt-2">
        <h1 className="m-0">{user.name}</h1>
        <p className="text-gray-500">{user.job}</p>
      </div>
    </div>
  );
};




export default UserProfilePage;
