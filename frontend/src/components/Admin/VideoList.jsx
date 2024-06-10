import React from "react";

const VideoList = () => {
  const path =
    "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg";
  const videos = [
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
    {
      thumbnail: path,
      name: "aqi",
      title: "Video Title",
      visibility: "Draft",
      date: "2024-06-06",
      views: 0,
      comments: 0,
    },
  ];

  return (
    <div className="bg-white h-auto shadow min-w-[640px] max-w-[1080px] rounded-lg">
      <div className="flex flex-col gap-3">
        <div className="flex bg-gray-50 gap-x-4 border-b border-gray-200 p-4 sticky top-0 z-10">
          <div className="flex-1 text-center text-sm font-medium text-gray-500 uppercase">
            Video
          </div>
          <div className="flex-1 min-w-80 text-center text-sm font-medium text-gray-500 uppercase">
            Title
          </div>
          <div className="flex-1 text-center text-sm font-medium text-gray-500 uppercase">
            Visibility
          </div>
          <div className="flex-1 text-center text-sm font-medium text-gray-500 uppercase">
            Date
          </div>
          <div className="flex-1 text-center text-sm font-medium text-gray-500 uppercase">
            Views
          </div>
          <div className="flex-1 text-center text-sm font-medium text-gray-500 uppercase">
            Comments
          </div>
          <div className="flex-1 text-center text-sm font-medium text-gray-500 uppercase">
            Actions
          </div>
          <div className="flex-1 text-center text-sm font-medium text-gray-500 uppercase">
            Delete
          </div>
        </div>
        {videos.map((video, index) => (
          <div
            key={index}
            className="flex items-center gap-3 border-b border-gray-200 p-4 hover:bg-gray-50 transition duration-300"
          >
            <div className="flex-1 text-center">
              <img
                src={video.thumbnail}
                alt="thumbnail"
                className="h-12 object-cover rounded-lg shadow-sm mx-auto"
              />
            </div>
            <div className="flex-1 min-w-80 ml-2 max-w-80 overflow-hidden text-left text-sm text-gray-700">
              {video.name}
            </div>
            <div className="flex-1 text-center text-sm text-gray-700">
              {video.visibility}
            </div>
            <div className="flex-1 text-center text-sm text-gray-700">
              {video.date}
            </div>
            <div className="flex-1 text-center text-sm text-gray-700">
              {video.views}
            </div>
            <div className="flex-1 text-center text-sm text-gray-700">
              {video.comments}
            </div>
            <div className="flex-1 text-center">
              <button className="text-blue-600 hover:underline">EDIT</button>
            </div>
            <div className="flex-1 text-center">
              <button className="text-blue-600 hover:underline">Del</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
