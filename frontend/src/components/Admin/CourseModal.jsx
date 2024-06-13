
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { LuImagePlus } from "react-icons/lu";
import AlphabeticInput from "../../components/AlphabeticInput"; // Adjust the import path as necessary
import axiosInstance from "../../utils/axiosInstance";

const CourseModal = ({ closeModal, Name, courseId }) => {
  const [imageDeleted, setImageDeleted] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [authorName, setAuthorName] = useState("");
  const [coursename, setCourseName] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseLevel, setCourseLevel] = useState("");
  const [coursePrice, setCoursePrice] = useState("");
  const [courseImage, setCourseImage] = useState(null);
  const [authorImage, setAuthorImage] = useState(null);
  const [courseDescription, setCourseDescription] = useState(""); // New state for course description

  const navigate = useNavigate();


  useEffect(() => {
    if (courseId) {
      const fetchCourseData = async () => {
        try {
        
          const response = await axiosInstance.get(
            `/auth/admin/courses/${courseId}`);

          const course = response.data.data;
          setAuthorName(course.author);
          setCourseName(course.course_name);
          setCourseCategory(course.category);
          setCourseLevel(course.level);
          setCoursePrice(course.price);
          setSelectedImage(course.coverImage);
          setSelectedAvatar(course.avatar);
          setCourseImage(course.coverImage);
          setAuthorImage(course.avatar);
          setCourseDescription(course.course_details); // Set course description
        } catch (error) {
          console.error("There was an error fetching the course data!", error);
        }
      };

      fetchCourseData();
    }
  }, [courseId]);

  const handleAddOrUpdateCourse = async (e) => {
    e.preventDefault();

    // Create form data to send to backend
    const formData = new FormData();
    formData.append("course_name", coursename);
    formData.append("course_details", courseDescription); // Include course description
    formData.append("author", authorName);
    formData.append("level", courseLevel);
    formData.append("category", courseCategory);
    formData.append("coverImage", courseImage);
    formData.append("avatar", authorImage);
    formData.append("price", coursePrice);



    try {
      if (!courseImage) {
        console.error("Cover image is required");
        // You can handle this error scenario here, such as displaying a message to the user
        return;
      }
      if (!authorImage) {
        console.error("author image is required");
        // You can handle this error scenario here, such as displaying a message to the user
        return;
      }
      if (coursePrice.length === 0) {
        console.error("Enter price");
        return;
      }

      let response;
      if (courseId) {
        console.log(courseId);
        response = await axiosInstance.put(
          `/auth/admin/courses/${courseId}`,
          formData);
      } else {
        response = await axiosInstance.post(
          "/auth/admin/add-course",
          formData);
      }
      console.log(response);

      console.log(
        courseId ? "Course updated successfully" : "Course added successfully"
      );

      // Reset form fields after successful submission
      setAuthorName("");
      setCourseName("");
      setCourseCategory("");
      setCourseLevel("");
      setCourseImage(null);
      setCoursePrice("");
      setAuthorImage(null);
      setCourseDescription(""); // Reset course description
      closeModal();
      if (!courseId) {
        navigate("/admin/dashboard");
      }
    } catch (error) {
      console.error(
        courseId ? "Error updating course:" : "Error adding course:",
        error.message
      );
    }
  };

  const handleAvatarChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedAvatar(URL.createObjectURL(event.target.files[0]));
      setAuthorImage(event.target.files[0]);
    }
  };

  const handleDeleteImage = () => {
    setImageDeleted(true);
    setSelectedImage("");
    setCourseImage(null);
    setImageUploaded(false);
  };

  const handleUploadImage = (event) => {
    setImageDeleted(false);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
      setCourseImage(event.target.files[0]);
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
              {courseId ? "Update Course" : "Add Course"}
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <IoMdClose className="w-7 h-7 text-black" />
            </button>
          </div>
          {/* Modal body */}
          <form onSubmit={handleAddOrUpdateCourse} className="p-4 md:p-5">
            <div className="grid gap-x-4 mb-4 md:grid-cols-2">
              {/* Name */}
              <div>
                <AlphabeticInput
                  label="Author Name"
                  value={authorName}
                  onChange={setAuthorName}
                />
                <AlphabeticInput
                  label="Course Name"
                  value={coursename}
                  onChange={setCourseName}
                />
              </div>

              {/* Image */}
              <div>
                <div className="flex justify-center mb-4">
                  <input
                    type="file"
                    accept=".jpg, .jpeg, .png"
                    id="fileInput"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                  <label htmlFor="fileInput">
                    {selectedAvatar ? (
                      <img
                        className="w-24 h-24 object-cover object-top rounded-full border border-gray-300 cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-75"
                        src={selectedAvatar}
                        alt="avatar"
                      />
                    ) : (
                      <RxAvatar className="w-24 h-24  object-cover rounded-full border border-gray-300 cursor-pointer transition-opacity duration-300 ease-in-out hover:opacity-75" />
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
                      className="absolute w-full h-full object-contain bg-black rounded-lg transition-transform duration-300 ease-in-out "
                      src={selectedImage}
                      alt="img"
                    />
                  )}
                  <div className="absolute top-0 right-0 mt-2 mr-2">
                    {!imageDeleted && selectedImage && (
                      <MdDelete
                        onClick={handleDeleteImage}
                        className="w-6 h-6 text-red-500 cursor-pointer hover:bg-slate-500 rounded-full "
                      />
                    )}
                  </div>

                  <div className="absolute bottom-3 left-0 right-0 flex justify-center mt-2">
                    {!imageUploaded && !courseImage && (
                      <div className="rounded-md border border-indigo-500 bg-gray-50 p-2 shadow-md ">
                        <label
                          htmlFor="upload"
                          className="flex flex-col items-center gap-2 cursor-pointer"
                        >
                          <LuImagePlus className="h-6 w-6 fill-white stroke-indigo-500" />
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
                <h1 className="flex justify-center text-sm font-medium text-gray-900 dark:text-white">
                  Course Image
                </h1>
              </div>

              {/* Category */}
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
                    onChange={(e) => setCourseCategory(e.target.value)}
                    value={courseCategory}
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
                <div className="mt-3 mb-3">
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Level
                  </label>
                  <select
                    id="level"
                    onChange={(e) => setCourseLevel(e.target.value)}
                    value={courseLevel}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option defaultValue>Select level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="RS"
                    value={coursePrice}
                    onChange={(e) => setCoursePrice(e.target.value)}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="col-span-1 mt-32">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="bg-gray-50 border resize-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Course Description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="col-span-2 mt-5  flex justify-end border-t rounded-t dark:border-gray-600">
                <button
                  type="submit"
                  className="px-4 py-2 mt-8 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
                >
                  {courseId ? "Update Course" : "Add Course"}
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
