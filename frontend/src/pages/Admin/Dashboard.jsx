import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '../../components/Admin/AddIcon';

function Dashboard() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/v1/course/courses');
        console.log(response);
        setCourseData(response.data.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, []);

  function YouTubeCard({ course_name, course_details, course_img, author_img, author, level, id }) {
    return (
      <Link 
        to={`/admin/courseDetail?${id}`} 
        className="max-w-sm w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transform transition duration-500 hover:scale-105"
      >
        <img 
          className="w-full h-48 object-cover object-scale-down rounded-t-lg transition duration-300 ease-in-out hover:opacity-80" 
          src={course_img} 
          alt="Video Thumbnail" 
        />
        <div className="p-5 flex">
          <img 
            className="w-12 h-12 rounded-full mr-4 border-2 border-gray-300 dark:border-gray-600 transition duration-300 ease-in-out hover:border-indigo-500" 
            src={author_img} 
            alt="Profile" 
          />
          <div className="flex flex-col justify-between">
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out hover:text-indigo-500">
              {course_name}
            </h5>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>{author} • {level} • {id}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 m-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {console.log(courseData)}
        {Array.isArray(courseData.courses) &&
          courseData.courses.map((course, index) => (
            <YouTubeCard
              key={index}
              course_name={course.course_name}
              course_details={course.course_details}
              course_img={course.course_img}
              author_img={course.author_img}
              author={course.author}
              level={course.level}
              id={course._id}
            />
          ))}
      </div>
      <div className="fixed bottom-10 right-10">
        <AddIcon />
      </div>
    </>
  );
}

export default Dashboard;
