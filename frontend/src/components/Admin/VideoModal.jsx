import React, { useState } from "react";

const VideoModal = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailSrc, setThumbnailSrc] = useState(null);
  const [videoSrc, setVideoSrc] = useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleVideoChange({ target: { files: files } });
    }
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file && file.type.startsWith("image/")) {
      setThumbnail(file);
      setError("");
      setIsDetailsOpen(true);
      reader.onload = function (e) {
        setThumbnailSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setThumbnail(null);
      setError("Please select a valid image file.");
    }
  };

  const handleImageChange = () => {
    // Reset thumbnail and thumbnail source
    setThumbnail(null);
    setThumbnailSrc("");
    // Trigger input click to allow user to select new image
    document.getElementById("upload").click();
  };

  const handleVideoChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith("video/")) {
      setFile(selectedFile);
      setError("");
      setIsDetailsOpen(true);
      setVideoSrc(URL.createObjectURL(selectedFile));

      // Extract filename from video and set it as title
      const videoName = selectedFile.name.replace(/\.[^/.]+$/, ""); // Remove file extension
      setTitle(videoName);
    } else {
      setFile(null);
      setError("Please select a valid video file.");
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setFile(null);
    setError("");
    setIsOpen(false);
    setIsDetailsOpen(false);
    setTitle("");
    setDescription("");
    setThumbnail(null);
    setThumbnailSrc(null);
    setVideoSrc(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    if (title.trim() === "" || !file || !thumbnail) {
      setError("Please fill in all required fields.");
      return;
    }
    // Handle form submission logic here
    console.log("Video details submitted:", {
      title,
      description,
      file,
      thumbnail,
    });
    closeModal();
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="inline-block text-white m-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Add Video
      </button>

      {isOpen && !isDetailsOpen && (
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
                <div className="max-w-xl">
                  <label
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                  >
                    <span className="flex items-center space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <span className="font-medium text-gray-600">
                        Drop Video, or{" "}
                        <span className="text-blue-600 underline">browse</span>
                      </span>
                    </span>
                    <input
                      type="file"
                      name="file_upload"
                      className="hidden"
                      accept="video/*"
                      onChange={handleVideoChange}
                    />
                  </label>
                  {error && (
                    <p className="mt-2 text-sm text-red-600">{error}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDetailsOpen && (
        <div
          id="details-modal"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <div
            className="relative p-4 w-full max-w-4xl max-h-full bg-white rounded-lg shadow dark:bg-gray-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal content */}
            <div className="relative">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Video Details
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
              <form onSubmit={handleSubmit} className="p-4 md:p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="inline-block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Title (required)
                    </label>
                    <input
                      type="text"
                      className="inline-block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="row-span-3 max-w-sm">
                    {videoSrc && (
                      <video
                        controls
                        src={videoSrc}
                        className="w-full mt-2 border border-gray-300 rounded-md"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Description
                    </label>
                    <textarea
                      className="resize-none scrollbar-thin scrollbar-webkit min-h-28 max-h-28 scrollbar-w block w-full p-2 mt-1 border border-gray-300 rounded-md dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                  <div>
                    <div className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Thumbnail
                    </div>
                    <div className="rounded-md border border-indigo-500 bg-gray-50 shadow-md w-36">
                      {thumbnailSrc ? (
                        <div className="relative">
                          <svg
                            onClick={handleImageChange}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 cursor-pointer top-0 right-0 absolute z-10"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <div>
                            <img
                              src={thumbnailSrc}
                              alt="Thumbnail Preview"
                              className="w-full max-h-16 object-cover"
                            />
                          </div>
                        </div>
                      ) : (
                        <label
                          htmlFor="upload"
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 fill-white stroke-indigo-500"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span className="text-gray-600 font-medium text-center">
                            Upload Thumbnail
                          </span>
                        </label>
                      )}
                      <input
                        id="upload"
                        type="file"
                        className="hidden"
                        onChange={handleThumbnailChange}
                      />
                    </div>

                    {error && (
                      <p className="mt-2 text-sm text-red-600">{error}</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 dark:focus:ring-offset-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;
