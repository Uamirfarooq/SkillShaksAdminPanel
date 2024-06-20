import React, { useState, useEffect } from "react";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import axiosInstance from "../../utils/axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { setRefreshingfalse } from "../../Feature/auth/authSlice";
import { truncateText } from "../../utils/truncateText";


const VideoList = () => {

  const dispatch = useDispatch()

  const isRefreshing = useSelector((state) => state.auth.isRefreshing);
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const fetchVideos = async () => {
    try {
      const userId = getUserIdFromCurrentUrl(); // Function to get userId from URL

      const response = await axiosInstance.get(`/auth/admin/courses/${userId}/videos`);

      setVideos(response.data.data || []); // Ensure it is an array

      if (isRefreshing === true) {
        dispatch(setRefreshingfalse())
      }

    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };


  useEffect(() => {
    fetchVideos();
  }, [isRefreshing]);


  const getUserIdFromCurrentUrl = () => {
    try {
      const urlObj = new URL(window.location.href);
      const pathSegments = urlObj.pathname.split('/');

      let userId = urlObj.searchParams.get('userId');
      if (!userId) {
        userId = pathSegments[pathSegments.length - 1];
      }
      return userId;
    } catch (error) {
      console.error("Invalid URL:", error);
      return null;
    }
  };

  const handleDeleteClick = (videoId) => {
    setVideoToDelete(videoId);
    setIsModalOpen(true);
  };

  const deleteVideo = async () => {
    try {

      await axiosInstance.delete(`/auth/admin/courses/videos/${videoToDelete}`);
      // Remove the deleted video from the state
      setVideos(videos.filter(video => video._id !== videoToDelete));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting video:", error);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
  <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">Video List</h2>
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
    {Array.isArray(videos) && videos.length > 0 ? (
      videos.map((video) => (
        <div
          key={video._id}
          className="flex relative items-start space-x-4 p-6 border-b dark:border-gray-700 last:border-none hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-300"
        >
          <div className="w-36 h-20">
            <img
              src={video.thumbnail_url}
              alt="thumbnail"
              className="w-full h-full object-cover rounded-lg shadow-sm"
            />
          </div>
          <div className="flex-1 max-h-40 space-y-2">
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">{video.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 max-h-12 overflow-hidden text-sm truncate">{truncateText(video.description, 50)}</p>
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <p>Visibility: {video.visibility}</p>
              <p>Date: {new Date(video.createdAt).toLocaleDateString()}</p>
              <p>Views: {video.views || 0}</p>
              <p>Comments: {video.comments || 0}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-600">
              <FaEdit />
            </button>
            <button
              className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-600"
              onClick={() => handleDeleteClick(video._id)}
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))
    ) : (
      <div className="text-center text-gray-500 dark:text-gray-400 p-4">No videos found</div>
    )}
  </div>

  {/* Modal */}
  {isModalOpen && (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Are you sure you want to delete this video?</h2>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-red-600 dark:bg-red-700 text-white px-4 py-2 rounded hover:bg-red-700 dark:hover:bg-red-600"
            onClick={deleteVideo}
          >
            Delete
          </button>
          <button
            className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100 px-4 py-2 rounded hover:bg-gray-400 dark:hover:bg-gray-500"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</div>


  );
};

export default VideoList;
