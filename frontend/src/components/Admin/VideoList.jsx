import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';


const VideoList = () => {
  const [videos, setVideos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);



  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const userId = getUserIdFromCurrentUrl(); // Function to get userId from URL
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:5500/api/v1/auth/admin/courses/${userId}/videos`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data); // Check the structure of the response
        setVideos(response.data.data || []); // Ensure it is an array
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

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
      const token = localStorage.getItem('accessToken');
      await axios.delete(`http://localhost:5500/api/v1/auth/admin/courses/videos/${videoToDelete}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Remove the deleted video from the state
      setVideos(videos.filter(video => video._id !== videoToDelete));
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting video:", error);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container border border-black mx-auto px-4 py-6 max-w-4xl">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Video List</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {Array.isArray(videos) && videos.length > 0 ? (
          videos.map((video, index) => (
            <div
              key={video._id} // Ensure the key is unique and corresponds to the video ID
              className="flex relative items-center space-x-4 max-h-40 p-4 border-b last:border-none hover:bg-gray-50 transition duration-300"
            >
              <div className="w-36">
                <div className="w-36 h-20">
                  <img
                    src={video.thumbnail_url}
                    alt="thumbnail"
                    className="w-full h-full object-cover rounded-lg shadow-sm"
                  />
                </div>
              </div>
              <div className="border border-black w-full max-h-20">
                <h3 className="text-sm max-w-2xl font-semibold text-gray-800">{video.title}</h3>
                <p className="text-gray-600 max-h-8 overflow-hidden text-sm mt-1">{video.description}</p>
                <div className="flex absolute bottom-1 space-x-4 font-bold text-sm text-gray-600 mt-2">
                  <p>Visibility: {video.visibility}</p>
                  <p>Date: {new Date(video.createdAt).toLocaleDateString()}</p>
                  <p>Views: {video.views || 0}</p>
                  <p>Comments: {video.comments || 0}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800">
                  <FaEdit />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDeleteClick(video._id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 p-4">No videos found</div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this video?</h2>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={deleteVideo}
              >
                Delete
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
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
