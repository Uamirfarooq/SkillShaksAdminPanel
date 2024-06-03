import React, { useState } from "react";

const CourseModal = ({ closeModal , courseName }) => {
  // const path = "https://imgv3.fotor.com/images/slider-image/A-clear-close-up-photo-of-a-woman.jpg"

  const [imageDeleted, setImageDeleted] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedAvatar(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleDeleteImage = () => {
    setImageDeleted(true);
    setSelectedImage("");
    setImageUploaded(false);
  };

  const handleUploadImage = (event) => {
    setImageDeleted(false);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      setImageUploaded(true);
    };
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex justify-center items-center w-full h-full bg-black bg-opacity-50">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Modal content */}
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          {/* Modal header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {courseName}
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
          <form className="p-4 md:p-5">
            <div className="grid gap-4 mb-4 md:grid-cols-2">
              {/* Name */}
              <div className="">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Course Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />

                <label
                  htmlFor="author"
                  className="block mb-2 mt-5 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  id="author"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
              </div>

              {/* Image */}
              <div>
                <div className="flex justify-center mb-5">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    // accept="image/*"
                    id="fileInput"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <label htmlFor="fileInput">
                    {selectedAvatar ? (
                      <img
                        className="w-24 h-24 object-cover rounded-full border border-gray-300 cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-75"
                        src={selectedAvatar}
                        alt="avatar"
                      />
                    ) : (
                      <svg
                        className="w-24 h-24 p-4 object-cover rounded-full border border-gray-300 cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-75"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        fill="#000000"
                      >
                        <g
                          id="Page-1"
                          stroke="none"
                          strokeWidth="1"
                          fillRule="evenodd"
                        >
                          <g
                            id="Dribbble-Light-Preview"
                            transform="translate(-180.000000, -2159.000000)"
                          >
                            <g
                              id="icons"
                              transform="translate(56.000000, 160.000000)"
                            >
                              <path
                                d="M134,2008.99998 C131.783496,2008.99998 129.980955,2007.20598 129.980955,2004.99998 C129.980955,2002.79398 131.783496,2000.99998 134,2000.99998 C136.216504,2000.99998 138.019045,2002.79398 138.019045,2004.99998 C138.019045,2007.20598 136.216504,2008.99998 134,2008.99998 M137.775893,2009.67298 C139.370449,2008.39598 140.299854,2006.33098 139.958235,2004.06998 C139.561354,2001.44698 137.368965,1999.34798 134.722423,1999.04198 C131.070116,1998.61898 127.971432,2001.44898 127.971432,2004.99998 C127.971432,2006.88998 128.851603,2008.57398 130.224107,2009.67298 C126.852128,2010.93398 124.390463,2013.89498 124.004634,2017.89098 C123.948368,2018.48198 124.411563,2018.99998 125.008391,2018.99998 C125.519814,2018.99998 125.955881,2018.61598 126.001095,2018.10898 C126.404004,2013.64598 129.837274,2010.99998 134,2010.99998 C138.162726,2010.99998 141.595996,2013.64598 141.998905,2018.10898 C142.044119,2018.61598 142.480186,2018.99998 142.991609,2018.99998 C143.588437,2018.99998 144.051632,2018.48198 143.995366,2017.89098 C143.609537,2013.89498 141.147872,2010.93398 137.775893,2009.67298"
                                id="profile-[#1341]"
                              ></path>
                            </g>
                          </g>
                        </g>
                      </svg>
                    )}
                  </label>
                </div>

                <div className="w-full h-full relative">
                  {imageDeleted || !selectedImage ? (
                    <div className=" w-full h-full flex items-center justify-center bg-gray-100 border border-gray-300 rounded-lg">
                      <span className="text-gray-400">No Image Uploaded</span>
                    </div>
                  ) : (
                    <img
                      className="absolute w-full h-full object-contain bg-black rounded-lg transition-transform duration-300 ease-in-out hover:bg-slate-500"
                      src={selectedImage}
                      alt="img"
                    />
                  )}
                  <div className="absolute top-0 right-0 mt-2 mr-2">
                    {!imageDeleted && selectedImage && (
                      <button
                        type="button"
                        onClick={handleDeleteImage}
                        className="text-red-500 hover:text-red-700"
                      >
                        Delete Image
                      </button>
                    )}
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center mt-2">
                    {!imageUploaded && (
                      <div className="rounded-md border border-indigo-500 bg-gray-50 p-2 shadow-md ">
                        <label
                          htmlFor="upload"
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 fill-white stroke-indigo-500"
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
                        </label>
                        <input
                          id="upload"
                          type="file"
                          accept=".jpg, .jpeg, .png"
                          className="hidden"
                          onChange={handleUploadImage}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <h1 className="flex justify-center mt-2 text-sm font-medium text-gray-900 dark:text-white">
                  Course Image
                </h1>
              </div>

              <div>
                <div className="flex flex-col">
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option defaultValue>Select category</option>
                    <option value="Artificial Intelligence">
                      Artificial Intelligence
                    </option>
                    <option value="Web Development">Web Development</option>
                    <option value="Machine Learning">Machine Learning</option>
                  </select>
                </div>
                {/* Level */}
                <div className="mt-3">
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option defaultValue>Select level</option>
                    <option value="Basic">Basic</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              {/* Category */}
              <div className="col-span-2 flex justify-end">
                <button
                  type="button"
                  // onClick={handleSave}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;
