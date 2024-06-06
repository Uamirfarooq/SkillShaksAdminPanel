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
    <div className="container mx-auto p-6 bg-white shadow rounded-lg">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase">
              Video
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase">
              Visibility
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase">
              Restrictions
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase">
              Date
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase">
              Views
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase">
              Comments
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {videos.map((video, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 transition duration-300">
              <td className="p-4 text-sm text-gray-700 flex items-center">
                <img src={video.thumbnail} alt="thumbnail" className="w-20 h-12 object-cover rounded-lg shadow-sm" />
              </td>
              <td className="p-4 text-sm text-gray-700">
                {video.name}
              </td>
              <td className="p-4 text-sm text-gray-700">
                {video.visibility}
              </td>
              <td className="p-4 text-sm text-gray-700">
                None
              </td>
              <td className="p-4 text-sm text-gray-700">
                {video.date}
              </td>
              <td className="p-4 text-sm text-gray-700">
                {video.views}
              </td>
              <td className="p-4 text-sm text-gray-700">
                {video.comments}
              </td>
              <td className="p-4 text-sm">
                <button className="text-blue-600 hover:underline">
                  EDIT DRAFT
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VideoList;
