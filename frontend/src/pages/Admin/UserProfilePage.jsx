import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserProfilePage = () => {
  const { userId } = useParams();

  // Sample data for demonstration
  const user = {
    id: userId,
    name: `User ${userId}`,
    email: `user${userId}@example.com`,
    role: userId % 2 === 0 ? 'Teacher' : 'Student', // Sample logic for role
    courses: ['Course 1', 'Course 2', 'Course 3'], // Sample courses
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-4">{user.name}</h1>
        <p className="text-lg mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="text-lg mb-2"><strong>Role:</strong> {user.role}</p>
        <h2 className="text-2xl font-semibold mt-6 mb-4">Courses</h2>
        <ul className="list-disc list-inside">
          {user.courses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default UserProfilePage;
