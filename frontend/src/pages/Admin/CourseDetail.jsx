// import React from 'react';

// function CourseDetail() {
//   return (
//     <>
//     <div className='relative flex flex-col items-center border sm:w-3/10 rounded-md h-screen'>
//       <section className='flex justify-start space-x-2 items-center mt-2 w-11/12 relative'>
//         <div className="w-24 h-24 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-lg border-4 border-gray-300">
//           <img src={path} alt="avatar" className="w-full h-full object-cover " />
//         </div>

//         <h1 className='text-yellow-500 min-w-28 inline-block'>Umair farooq</h1>
//         <button className="absolute right-0 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
//           Edit
//         </button>
//       </section>

//       <div className="overflow-hidden w-11/12 h-56 mt-3 bg-gray-200 rounded-md p-3 ">
//         <img
//           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s"
//           alt="Thumbnail"
//           className="w-full h-full object-cover"
//         />
//       </div>

//       <section className="overflow-hidden w-11/12 mt-3 bg-gray-200 rounded-md p-3 ">
//         <div className='relative flex justify-between bg-gray-400 p-2 rounded-md mb-2'>
//           <span>fssdf</span>
//           <span className='absolute left-48'>ssssaaaaaaaaaassssss</span>
//         </div>


//       </section>

//       <section className="absolute bottom-4 overflow-hidden w-11/12 h-1/6 mt-3 bg-gray-200 rounded-md p-3" >
//       <button className=" absolute px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
//           Edit
//         </button>

//       </section>

//     </div>
//     <div>

//     </div>
//     </>

//   )
// }




// export default CourseDetail


import React from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Admin/Modal';

const path = 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp';
const CourseDetail = () => {


  return (
    <div className='flex'>
      <div className="sidebar  h-[94vh] lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900">
        <div className='flex items-center justify-between'>
          <div className="w-24 h-24 sm:w-16 sm:h-16 rounded-full  overflow-hidden shadow-lg border-4 border-gray-300">
            <img src={path} alt="avatar" className="w-full h-full object-cover " />
          </div>
          <h1 className='text-yellow-500 min-w-28 inline-block'>Umair farooq</h1>
          <button className=" px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
            Edit
          </button>

        </div>
        <div className="my-4 bg-gray-600 h-[1px]"></div>

        <div

          className="max-w-sm w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transform transition duration-500 hover:scale-105"
        >
          <img
            className="w-full h-48 object-cover object-scale-down rounded-t-lg transition duration-300 ease-in-out hover:opacity-80"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s"
            alt="Video Thumbnail"
          />
          <div className="p-5 flex flex-col items-start">
            <div className='flex relative'>
              <label className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out hover:text-indigo-500'>Course Name</label>
              <h1 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out hover:text-indigo-500 absolute left-36'>Python</h1>
            </div>
            <div className='flex relative'>
              <label className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out hover:text-indigo-500'>Course Category</label>
              <h1 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out hover:text-indigo-500 absolute left-36'>Intermediate</h1>
            </div>
            <div className='flex relative'>
              <label className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out hover:text-indigo-500'>Course Level</label>
              <h1 className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out hover:text-indigo-500 absolute left-36'>Advance</h1>
            </div>
            <div className='flex flex-col relative items-start justify-start'>
              <label className='text-lg font-semibold tracking-tight text-gray-900 dark:text-white transition duration-300 ease-in-out hover:text-indigo-500'>Description</label>
              <div className="max-w-md h-32 overflow-hidden mx-auto p-6 bg-white rounded-xl shadow-md justify-start">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore et aliquam amet delectus repudiandae fugiat quae aspernatur doloribus eligendi quo eos dignissimos sapiente, qui doloremque quia odit veritatis nesciunt exercitationem!
              </div>

            </div>

          </div>
        </div>
        <div className="my-4 bg-gray-600 h-[1px]"></div>

        <div className='flex  h-56 flex-col justify-end items-end'>
          <button type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
        </div>
      </div>
      <div>
        <Modal />
      </div>

    </ div>


  );
}

export default CourseDetail;
