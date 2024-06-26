import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import AddIcon from "../../components/Admin/AddIcon";
import FilterComponent from "../../components/FilterItems";
import axiosInstance from "../../utils/axiosInstance";
import { truncateText } from "../../utils/truncateText";
import { useDispatch, useSelector } from "react-redux";
import { setRefreshingfalse } from "../../Feature/auth/authSlice";

function Dashboard() {
  const [courseData, setCourseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({});
  const dispatch = useDispatch();

  const isRefreshing = useSelector((state) => state.auth.isRefreshing);

  const fetchCourseData = async () => {
    try {
      const response = await axiosInstance.get("/auth/admin/courses", {});
      setCourseData(response.data.data || []);

      if (isRefreshing === true) {
        dispatch(setRefreshingfalse())
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  useEffect(() => {
    fetchCourseData();
  }, [isRefreshing]);

  const filteredCourseData = courseData.filter(course => {
    const matchesSearchQuery = course.course_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.course_details.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters = Object.entries(selectedFilters).every(([key, values]) => {
      if (values.length === 0) return true;
      if (key === 'Category') {
        return values.includes(course.category);
      }
      if (key === 'Level') {
        return values.includes(course.level);
      }
      return true;
    });

    return matchesSearchQuery && matchesFilters;
  });

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const CourseCard = ({
    course_name,
    course_details,
    coverImage,
    avatar,
    category,
    author,
    level,
    id,
    price,
  }) => {
    return (
      <div className="p-4" >
        <Link to={`/admin/courseDetail/${id}`}>
          <div className="group w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 dark:bg-gray-800 dark:border-gray-700">
            <div className="relative mb-2">
              <img
                className="object-cover object-center w-full h-56 rounded-t-lg"
                src={coverImage}
                alt="product"
              />
              <span className="absolute top-2 left-2 bg-yellow-300 text-gray-900 text-xs font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                {category}
              </span>
            </div>
            <div className="flex p-4">
              <div className="w-14 h-14 flex-shrink-0">
                <img
                  className="w-full h-full rounded-full object-cover border-2 border-gray-500 shadow-lg hover:shadow-xl transition-shadow duration-300"
                  src={avatar}
                  alt="Profile"
                />
              </div>

              <div className="ml-4">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {course_name}
                </h5>
                <p className="text-sm h-10 text-gray-600 dark:text-gray-300">{truncateText(course_details, 70)}</p>
              </div>
            </div>

            <div className="px-4 pb-4">
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
                    {price}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="p-4 w-full flex justify-end items-center">
        <div className="max-w-lg mx-auto">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              placeholder="Search Courses"
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery}
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        </div>
        <FilterComponent onFilterChange={handleFilterChange} />
      </div>
      {filteredCourseData.length === 0 ? (
        <div className=" h-[88vh]">
          <p className="text-gray-600 dark:text-gray-300 text-2xl font-semibold m-10 ">No Course Available Yet . . .</p>
        </div>
      ) : (
        // <div className="grid grid-cols-1 mx-10 mt-2 mb-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className={`grid grid-cols-1 mx-10 mt-2 mb-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${courseData.length < 8 ? 'h-[88vh]' : ''}`}>
          {filteredCourseData.map((course, index) => (
            <CourseCard
              key={index}
              course_name={course.course_name}
              course_details={course.course_details}
              coverImage={course.coverImage}
              avatar={course.avatar}
              author={course.author}
              category={course.category}
              level={course.level}
              id={course._id}
              price={course.price}
            />
          ))}
        </div>
      )}
      <div className="fixed bottom-10 right-10">
        <AddIcon />
      </div>
    </>
  );
}

export default Dashboard;
