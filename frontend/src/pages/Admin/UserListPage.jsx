import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
  const navigate = useNavigate();

  const teachers = [
    { name: 'John Doe', job: 'Total courses: 5', profileImg: 'https://via.placeholder.com/100' },
    { name: 'Jane Smith', job: 'Total courses: 3', profileImg: 'https://via.placeholder.com/100' },
    { name: 'Mark Johnson', job: 'Total courses: 7', profileImg: 'https://via.placeholder.com/100' },
    { name: 'Lucy Brown', job: 'Total courses: 2', profileImg: 'https://via.placeholder.com/100' },
  ];

  const students = [
    { name: 'Student A', job: 'Completed courses: 10', profileImg: 'https://via.placeholder.com/100' },
    { name: 'Student B', job: 'Completed courses: 7', profileImg: 'https://via.placeholder.com/100' },
    { name: 'Student C', job: 'Completed courses: 8', profileImg: 'https://via.placeholder.com/100' },
    { name: 'Student D', job: 'Completed courses: 5', profileImg: 'https://via.placeholder.com/100' },
  ];

  const handleCardClick = (user) => {
    navigate('/admin/user', { state: { user } });
  };

  return (
    <div className='flex m-2 gap-2'>
      <div className="h-screen w-1/2 snap-y snap-mandatory overflow-y-scroll rounded-lg scrollbar-hide">
        {teachers.map((teacher, index) => (
          <div className="flex p-2 snap-center bg-white" key={index} onClick={() => handleCardClick(teacher)}>
            <div className="h-64 w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
              <div className="w-24 h-24 rounded-full bg-cover bg-center mb-2" style={{ backgroundImage: `url(${teacher.profileImg})` }}></div>
              <div>
                <span>{teacher.name}</span>
                <p className="text-gray-500">{teacher.job}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-screen w-1/2 snap-y snap-mandatory overflow-y-scroll rounded-lg scrollbar-hide">
        {students.map((student, index) => (
          <div className="flex p-2 snap-center bg-white" key={index} onClick={() => handleCardClick(student)}>
            <div className="h-64 w-full flex flex-col items-center justify-center bg-white rounded-lg shadow-md">
              <div className="w-24 h-24 rounded-full bg-cover bg-center mb-2" style={{ backgroundImage: `url(${student.profileImg})` }}></div>
              <div>
                <span>{student.name}</span>
                <p className="text-gray-500">{student.job}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
