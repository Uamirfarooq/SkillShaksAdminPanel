import React, { useState } from 'react';
import CourseModal from './CourseModal';

const AddIcon = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4">
      <button onClick={openModal} className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
      {modalOpen && <CourseModal closeModal={closeModal} courseName = "Add Course" />}
    </div>
  );
};

export default AddIcon;
