import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get('http://localhost:5500/api/v1/admin/getcourse');
        setCourseData(response.data.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, []);

  function YouTubeCard({ course_name, course_details, course_img, author_img, author, level }) {
    return (
      <div className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <img className="w-full h-48 object-cover object-scale-down rounded-t-lg" src={course_img} alt="Video Thumbnail" />
        <div className="p-5 flex">
          <img className="w-12 h-12 rounded-full mr-4" src={author_img} alt="Profile" />
          <div className="flex flex-col justify-between">
            <h5 className="text-lg font-semibold tracking-tight text-gray-900 dark:text-white">
              {course_name}
            </h5>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>{author} • {level}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          />
        ))}
    </div>
  );
}

export default Dashboard;
