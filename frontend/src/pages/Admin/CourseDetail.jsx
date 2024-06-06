import React, { useEffect, useState } from 'react';
import Modal from '../../components/Admin/Modal';
import CourseModal from '../../components/Admin/CourseModal';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to access route parameters

const CourseDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseDetails, setCourseDetails] = useState(null); // State to hold course details
  const { id } = useParams(); // Access the course ID from the route parameters

  useEffect(() => {
    const fetchCourseData = async () => {
      const accessToken = localStorage.getItem('accessToken');
      try {
        // Use the course ID in the API endpoint to fetch specific course details
        const response = await axios.get(`http://localhost:5500/api/v1/admin/getcourse/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log(response);
        if (response.data.data) {
          setCourseDetails(response.data.data);
        } else {
          console.error("Course not found");
        }
      } catch (error) {
        console.error("Error fetching course data:", error);
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized access - possibly due to an invalid or expired token.");
          // You might want to redirect the user to the login page here
        }
      }
    };

    fetchCourseData();
  }, [id]); // Add id to the dependency array to fetch data when the ID changes

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (!courseDetails) {
    return <div>Loading...</div>; // Show a loading indicator while fetching data
  }

  return (
    <div className='flex'>
      <div className="sidebar h-[94vh] lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
        <div className='flex items-center justify-between'>
          <div className="w-24 h-24 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-lg border-4 border-gray-300">
            <img src={courseDetails.author_img} alt="avatar" className="w-full h-full object-cover" />
          </div>
          <h1 className='text-yellow-500 min-w-28 inline-block'>{courseDetails.author}</h1>
          <button className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Edit
          </button>
        </div>
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div className="max-w-sm w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
          <div className="relative group">
            <img
              className="w-full h-48 object-cover object-scale-down rounded-t-lg transition duration-300 ease-in-out"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s"
              alt="Video Thumbnail"
            />
            <svg
              onClick={toggleModal}
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 hover:opacity-20 hover:bg-slate-50 rounded-2xl absolute z-10 cursor-pointer right-2 top-2 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              viewBox="0 0 48 48"
            >
              <path d="M38.657 18.536l2.44-2.44c2.534-2.534 2.534-6.658 0-9.193-1.227-1.226-2.858-1.9-4.597-1.9s-3.371.675-4.597 1.901l-2.439 2.439L38.657 18.536zM27.343 11.464L9.274 29.533c-.385.385-.678.86-.848 1.375L5.076 41.029c-.179.538-.038 1.131.363 1.532C5.726 42.847 6.108 43 6.5 43c.158 0 .317-.025.472-.076l10.118-3.351c.517-.17.993-.463 1.378-.849l18.068-18.068L27.343 11.464z"></path>
            </svg>
          </div>
          <div className="p-5 flex flex-col items-start">
            <div className='flex relative'>
              <label className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out '>Course Name</label>
              <h1 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out absolute left-36'>{courseDetails.course_name}</h1>
            </div>
            <div className='flex relative'>
              <label className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out '>Course Category</label>
              <h1 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out absolute left-36'>{courseDetails.category}</h1>
            </div>
            <div className='flex relative'>
              <label className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out '>Course Level</label>
              <h1 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out absolute left-36'>{courseDetails.level}</h1>
            </div>
          </div>
        </div>
        <div className="my-4 bg-gray-600 h-[1px]"></div>
        <div className='flex h-56 flex-col justify-end items-end'>
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
        </div>
      </div>
      <div>
        <Modal />
      </div>
      {isModalOpen && (
        <CourseModal closeModal={toggleModal} courseName="Edit Course" />
      )}
    </div>
  );
};

export default CourseDetail;
