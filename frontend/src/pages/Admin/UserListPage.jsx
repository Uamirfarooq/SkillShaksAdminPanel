import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const UserListPage = () => {
  // Sample data for demonstration
  const teachers = [
    { id: 1, name: 'Teacher A', email: 'teacherA@example.com' },
    { id: 2, name: 'Teacher B', email: 'teacherB@example.com' },
  ];

  const students = [
    { id: 1, name: 'Student A', email: 'studentA@example.com' },
    { id: 2, name: 'Student B', email: 'studentB@example.com' },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        User Management
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Teachers</h2>
          <ul>
            {teachers.map((teacher) => (
              <li key={teacher.id} className="mb-4">
                <Link to={`/admin/user/${teacher.id}`} className="text-blue-500 hover:underline">
                  {teacher.name} ({teacher.email})
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg"
          whileHover={{ scale: 1.05 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Students</h2>
          <ul>
            {students.map((student) => (
              <li key={student.id} className="mb-4">
                <Link to={`/user/${student.id}`} className="text-blue-500 hover:underline">
                  {student.name} ({student.email})
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default UserListPage;
