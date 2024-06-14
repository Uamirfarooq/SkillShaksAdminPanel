import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { motion } from 'framer-motion';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const AnalyticsPage = () => {
  const teacherCourseData = {
    labels: ['Teacher A', 'Teacher B', 'Teacher C', 'Teacher D'],
    datasets: [
      {
        label: 'Courses Sold',
        data: [50, 75, 20, 90],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const monthlySalesData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Monthly Sales ($)',
        data: [3000, 2000, 4000, 5000, 6000, 7000],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const coursesAddedData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Courses Added',
        data: [5, 10, 6, 7, 8, 9],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1,
      },
    ],
  };

  const studentsAddedData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Students Added',
        data: [20, 30, 40, 50, 60, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
      },
    },
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
  <motion.h1
    className="text-4xl font-bold mb-8 text-center text-gray-800 dark:text-white"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    Analytics Dashboard
  </motion.h1>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    <motion.div
      className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 p-6 rounded-lg shadow-lg dark:shadow-lg dark:shadow-gray-700"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Teacher vs Course Sales</h2>
      <Bar data={teacherCourseData} options={{ ...options, title: { ...options.title, text: 'Courses Sold by Each Teacher' } }} />
    </motion.div>
    <motion.div
      className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 p-6 rounded-lg shadow-lg dark:shadow-lg dark:shadow-gray-700"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Monthly Sales</h2>
      <Line data={monthlySalesData} options={{ ...options, title: { ...options.title, text: 'Monthly Sales of Courses' } }} />
    </motion.div>
    <motion.div
      className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 p-6 rounded-lg shadow-lg dark:shadow-lg dark:shadow-gray-700"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Courses Added by Month</h2>
      <Bar data={coursesAddedData} options={{ ...options, title: { ...options.title, text: 'Courses Added by Month' } }} />
    </motion.div>
    <motion.div
      className="bg-white dark:bg-gray-800 dark:border dark:border-gray-700 p-6 rounded-lg shadow-lg dark:shadow-lg dark:shadow-gray-700"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Students Added by Month</h2>
      <Line data={studentsAddedData} options={{ ...options, title: { ...options.title, text: 'Students Added by Month' } }} />
    </motion.div>
  </div>
</div>


  );
};

export default AnalyticsPage;
