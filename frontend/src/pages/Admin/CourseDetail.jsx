import React from 'react';

function CourseDetail() {
  const path = 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp';
  return (
    <div className='relative flex flex-col items-center border sm:w-3/10 max-w-md rounded-md h-screen'>
      <section className='flex justify-start space-x-2 items-center mt-2 w-11/12 relative'>
        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden shadow-lg border-4 border-gray-300">
          <img src={path} alt="avatar" className="w-full h-full object-cover" />
        </div>

        <h1 className='text-yellow-500  mx-auto text-xl sm:mr-4'>Author name</h1>
        <button className="absolute right-0 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Edit
        </button>
      </section>
      
      <div className="overflow-hidden w-11/12 h-56 mt-3 bg-gray-200 rounded-md p-3 ">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s"
          alt="Thumbnail"
          className="w-full h-full object-cover"
        />
      </div>

      <section className="overflow-hidden w-11/12 mt-3 bg-gray-200 rounded-md p-3 ">
        <div className='relative flex justify-between bg-gray-400 p-2 rounded-md mb-2'>
          <span>fssdf</span>
          <span className='absolute left-48'>ssssaaaaaaaaaassssss</span>
        </div>
        <div className='relative flex justify-between bg-gray-400 p-2 rounded-md mb-2'>
          <span>fssdf</span>
          <span className='absolute left-48'>ssssaaaaaaaaaassssss</span>
        </div>
        <div className='relative flex justify-between bg-gray-400 p-2 rounded-md mb-2'>
          <span>fssdf</span>
          <span className='absolute left-48'>ssssaaaaaaaaaassssss</span>
        </div>
        <div className='relative flex justify-between bg-gray-400 p-2 rounded-md mb-2'>
          <span>fssdf</span>
          <span className='absolute left-48'>ssssaaaaaaaaaassssss</span>
        </div>
        <div className='relative flex justify-between bg-gray-400 p-2 rounded-md mb-2'>
          <span>fssdf</span>
          <span className='absolute left-48'>ssssaaaaaaaaaassssss</span>
        </div>
        {/* <form className="flex justify-between">
         <label htmlFor="name">Name</label>
           <input type="text" value="Default Value" className=""disabled   />
        </form> */}
      </section>

      <section className="absolute bottom-4 overflow-hidden w-11/12 h-1/6 mt-3 bg-gray-200 rounded-md p-3" >
      <button className=" absolute px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
          Edit
        </button>
        
      </section>

    </div>

  )
}




export default CourseDetail
