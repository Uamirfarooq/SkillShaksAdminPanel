import React from 'react';

const VideoList = () => {
  const path = "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg";
  const videos = [
    {
      thumbnail: path,
      name: 'aqi',
      title: 'Video Title',
      visibility: 'Draft',
      date: '2024-06-06',
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: 'aqi',
      title: 'Video Title',
      visibility: 'Draft',
      date: '2024-06-06',
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: 'aqi',
      title: 'Video Title',
      visibility: 'Draft',
      date: '2024-06-06',
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: 'aqi',
      title: 'Video Title',
      visibility: 'Draft',
      date: '2024-06-06',
      views: 0,
      comments: 0,
    },
  ];

  return (
    <div className="container ml-[3vw] w-[74vw] max-[1200px]:w-[69vw] max-[900px]:w-[55vw] mx-auto p-6 bg-white shadow rounded-lg">
  <div className="flex flex-col gap-3">
    <div className="flex bg-gray-50 border-b gap-3 border-gray-200 p-4 ">
      <div className="w-1/4 text-left text-sm font-medium text-gray-500 uppercase">Video</div>
      <div className="w-1/4 text-left text-sm font-medium text-gray-500 uppercase">Name</div>
      <div className="w-1/4 text-left text-sm font-medium text-gray-500 uppercase">Visibility</div>
      <div className="w-1/4 text-left text-sm font-medium text-gray-500 uppercase hidden sm:block">Restrictions</div>
      <div className="w-1/4 text-left text-sm font-medium text-gray-500 uppercase">Date</div>
      <div className="w-1/4 text-left text-sm font-medium text-gray-500 uppercase">Views</div>
      <div className="w-1/4 text-left text-sm font-medium text-gray-500 uppercase">Comments</div>
      <div className="w-1/4 text-left text-sm font-medium text-gray-500 uppercase">Actions</div>
    </div>
    {videos.map((video, index) => (
      <div key={index} className="flex items-center border-b gap-3 border-gray-200 p-4 hover:bg-gray-50 transition duration-300">
        <div className="w-1/4 text-sm text-gray-700 flex items-center">
          <img src={video.thumbnail} alt="thumbnail" className="w-20 h-12 object-cover rounded-lg shadow-sm" />
        </div>
        <div className="w-1/4 text-sm text-gray-700">{video.name}</div>
        <div className="w-1/4 text-sm text-gray-700">{video.visibility}</div>
        <div className="w-1/4 text-sm text-gray-700 hidden sm:block">None</div>
        <div className="w-1/4 text-sm text-gray-700">{video.date}</div>
        <div className="w-1/4 text-sm text-gray-700">{video.views}</div>
        <div className="w-1/4 text-sm text-gray-700">{video.comments}</div>
        <div className="w-1/4 text-sm">
          <button className="text-blue-600 hover:underline">EDIT DRAFT</button>
        </div>
      </div>
    ))}
  </div>
</div>

  );
};

export default VideoList;
