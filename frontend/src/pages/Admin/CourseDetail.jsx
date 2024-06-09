import React, { useState, useEffect } from "react";
import VideoModal from "../../components/Admin/VideoModal";
import CourseModal from "../../components/Admin/CourseModal";
import axios from "axios";
import VideoList from "../../components/Admin/VideoList";
import { useNavigate } from "react-router-dom";

const CourseDetail = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
  };

  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
  };

  const getUserIdFromCurrentUrl = () => {
    try {
      const urlObj = new URL(window.location.href);
      const pathSegments = urlObj.pathname.split("/");

      // Check if user ID is in the query parameters
      let userId = urlObj.searchParams.get("userId");

      // If not in query parameters, assume it's the last segment in the URL path
      if (!userId) {
        userId = pathSegments[pathSegments.length - 1];
      }

      return userId;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  };
  const userid = getUserIdFromCurrentUrl();

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5500/api/v1/admin/getcourse/${userid}`,
          {}
        );

        console.log("this is data comuibg from data base", response.data.data);
        setCourseData(response.data.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    };

    fetchCourseData();
  }, []);

  const DeleteCourse = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/v1/delete-course/${userid}`
      );
      console.log("Course deleted successfully", response);

      navigate("/admin/dashboard"); // Navigate to the home page after deletion
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      closeConfirmModal();
    }
  };

  return (
    <div className="flex">
      <div className="sidebar h-[92vh] lg:left-0 p-2 w-[21vw] max-[1070px]:w-[29vw] text-center bg-gray-900">
        <div className="w-[20vw] max-[1070px]:w-[25vw] bg-white dark:bg-gray-800 border border-gray-200 relative dark:border-gray-700 rounded-lg shadow-md transform transition duration-500 hover:scale-105">
          <div className="relative group">
            <img
              className="w-full h-42 object-cover object-scale-down rounded-t-lg transition duration-300 ease-in-out"
              src={courseData.coverImage}
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
          <div className="flex items-center gap-4 p-4">
            <img
              className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
              src={courseData.avatar}
              alt="Profile"
            />
            <p className="text-gray-700 font-semibold">{courseData.author}</p>
          </div>
          <hr />
          <div className="px-4 text-[0.8rem] flex flex-col items-start py-2">
            <div className="mb-4">
              <p className="text-gray-700 font-semibold"><span className="font-bold">Course Name:</span>&nbsp;&nbsp; {courseData.course_name}</p>
              {/* <p className="text-gray-600"></p> */}
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold"><span className="font-bold">Course Category:</span>&nbsp;&nbsp; {courseData.category}</p>
              {/* <p className="text-gray-600"></p> */}
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold"><span className="font-bold">Course Level:</span>&nbsp;&nbsp; {courseData.level}</p>
              {/* <p className="text-gray-600"></p> */}
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">
                <span className="font-bold">Course Current Price:</span>&nbsp;&nbsp; {courseData.price}
              </p>
              {/* <p className="text-gray-600"></p> */}
            </div>
            <div className="mb-4">
              <p className="text-gray-700 font-semibold">
                <span className="font-bold">Course Description:</span>&nbsp;&nbsp; {courseData.descstrion}
              </p>
              {/* <p className="text-gray-600"></p> */}
            </div>
          </div>
        </div>
        <div className="my-4 bg-gray-600 h-[1px]"></div>

          <button
            onClick={openConfirmModal}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Delete
          </button>
        </div>

      <div>
        <div>
          <VideoModal />
        </div>
        <div>
          <VideoList />
        </div>
      </div>

      {isModalOpen && (
        <CourseModal closeModal={toggleModal} Name="Edit Course" />
      )}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold">
              Are you sure you want to delete this course?
            </h2>
            <div className="mt-4 flex justify-end">
              <button
                onClick={closeConfirmModal}
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={DeleteCourse}
                className="px-4 py-2 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;
