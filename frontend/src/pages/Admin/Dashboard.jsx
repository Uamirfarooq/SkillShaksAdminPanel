import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AddIcon from "../../components/Admin/AddIcon";

function Dashboard() {
  const [courseData, setCourseData] = useState([]);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get("http://localhost:5500/api/v1/admin/getcourse", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(response);
        setCourseData(response.data.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, []);

  const CourseCard = ({
    course_name,
    course_details,
    coverImage,
    avatar,
    author,
    level,
    id,
  }) => {
    return (
      <Link to={`/admin/courseDetail/${id}`}> {/* Update URL to include course ID */}
        <div className="w-full">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="mb-2">
              <img
                className="object-cover object-center w-full h-56 rounded-t-lg "
                src={coverImage}
                alt="product"
              />
            </div>
            <div className="px-2">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {course_name}
              </h5>
              <div className="relative flex items-center mt-2.5 mb-5">
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                  {[...Array(4)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                  ))}
                  <svg
                    className="w-4 h-4 text-gray-200 dark:text-gray-600"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 22 20"
                  >
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                  5.0
                </span>
                <div className="flex items-center justify-between absolute right-5">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    $599
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      <div className="grid grid-cols-1 m-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {console.log(courseData)}
        {Array.isArray(courseData) &&
          courseData.map((course, index) => (
            <CourseCard
              key={index}
              course_name={course.course_name}
              course_details={course.course_details}
              coverImage={course.coverImage} /* Ensure correct prop name */
              avatar={course.avatar} /* Ensure correct prop name */
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
