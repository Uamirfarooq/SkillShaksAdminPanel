import axios from 'axios';
import React, { useState } from 'react';

const Modal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState('');
  const [videoPreview, setVideoPreview] = useState(null);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
    setVideoFile(null);
    setTitle('');
    setVideoPreview(null);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideoFile(file);
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoPreview(videoURL);
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('video', videoFile);
    formData.append('title', title);

    try {
      await axios.post('http://localhost:5500/api/v1/admin/uploadvideo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      closeModal();
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="block text-white m-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add Video
      </button>

      {isOpen && (
        <div
          id="default-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="relative p-4 w-full max-w-2xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="relative">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Upload Video
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5 space-y-4">
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={handleTitleChange}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-gray-200"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-gray-700 dark:text-gray-300">Video File</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-600 dark:text-gray-200"
                  />
                </div>
                {videoPreview && (
                  <div className="mt-4">
                    <video controls className="w-full rounded-lg">
                      <source src={videoPreview} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                    <p className="mt-2 text-center text-gray-700 dark:text-gray-300">{title}</p>
                  </div>
                )}
              </div>
              {/* Modal footer */}
              <div className="flex justify-end p-4 md:p-5 border-t rounded-b dark:border-gray-600">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
