import React, { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import VideoList from "../../components/Admin/VideoList";
import VideoModal from "../../components/Admin/VideoModal";
import CourseModal from "../../components/Admin/CourseModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CourseDetail = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [courseData, setCourseData] = useState([]);

  const token = localStorage.getItem('accessToken');

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
         // Retrieve the token from local storage

        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get(
          `http://localhost:5500/api/v1/auth/admin/courses/${userid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );

        console.log('This is data coming from the database', response.data.data);
        setCourseData(response.data.data);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchCourseData();
  }, [userid]);
  const DeleteCourse = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5500/api/v1/auth/admin/courses/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
      console.log("Course deleted successfully", response);

      navigate("/admin/dashboard"); // Navigate to the home page after deletion
    } catch (error) {
      console.error("Error deleting course:", error);
    } finally {
      closeConfirmModal();
    }
  };

  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + "...";
  };

  return (
    <>
      <div className="flex min-w-min h-screen relative bg-gray-100  ">
        <aside className="group/sidebar flex flex-col shrink-0 max-w-screen-sm transition-all duration-300 ease-in-out m-0 z-50 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start  loopple-fixed-start">
          <div className="bg-gray-200">
            <div className="flex items-center justify-between mt-3 px-4 py-5">
              <div className="flex items-center mr-5">
                <div className="mr-5">
                  <div className="inline-block shrink-0 cursor-pointer rounded-full">
                    <img
                      className="w-[60px] h-[60px] object-cover shrink-0 inline-block rounded-full"
                      src={courseData.avatar}
                      alt="avatar"
                    />
                  </div>
                </div>
                <div className="mr-2">
                  <span className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse">
                    {courseData.author}
                  </span>
                </div>
              </div>
              <span>
                <MdDelete
                  title="delete"
                  onClick={openConfirmModal}
                  className=" text-red-600 w-6 h-6 cursor-pointer hover:opacity-20 hover:bg-slate-50 rounded-2xl"
                >
                  Delete
                </MdDelete>
              </span>
              <span>
                <MdEdit
                  title="edit"
                  onClick={toggleModal}
                  className="cursor-pointer w-6 h-6 hover:opacity-20 hover:bg-slate-50 rounded-2xl"
                />
              </span>
            </div>
            <div className=" px-3 ">
              <div className="flex flex-col aspect-w-16 aspect-h-9 font-medium">
                <img
                  className="w-full h-full object-cover object-top max-w-xs"
                  src={courseData.coverImage}
                  alt="description"
                />
              </div>

              <div className="p-2 text-[0.9rem] max-w-xs mt-2 ">
                <div className="mb-4">
                  <p className="text-gray-900 font-semibold leading-tight">
                    <span className="font-bold">Course Name:</span>&nbsp;&nbsp;
                    {courseData.course_name}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-900 font-semibold leading-tight">
                    <span className="font-bold">Course Category:</span>
                    &nbsp;&nbsp;
                    {courseData.category}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-900 font-semibold leading-tight">
                    <span className="font-bold">Course Level:</span>&nbsp;&nbsp;
                    {courseData.level}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-900 font-semibold leading-tight">
                    <span className="font-bold">Course Current Price:</span>
                    &nbsp;&nbsp;
                    {courseData.price}
                  </p>
                </div>
                <div className="mb-4">
                  <p className="text-gray-900 font-semibold leading-tight">
                    <span className="font-bold">Course Description:</span>
                    &nbsp;&nbsp;
                    {truncateText(courseData.course_details, 87)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </aside>
        <div className=" flex-grow mt-20 mx-auto border h-4/5  min-w-[640px] max-w-[1080px] overflow-y-scroll scrollbar-hide ">
          <VideoList />
        </div>
        <div className=" absolute top-0 right-0 my-8 mx-4 ">
          <VideoModal />
        </div>
        {isModalOpen && (
          <CourseModal
            closeModal={toggleModal}
            Name="Edit Course"
            courseId={userid}
          />
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
    </>
  );
};

export default CourseDetail;
