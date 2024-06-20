// ToastContext.js
import React, { createContext, useContext, useState } from 'react';
import { IoIosClose } from 'react-icons/io';
import { IoMdInformationCircle } from 'react-icons/io';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message) => {
    const id = Date.now();
    setToasts((prevToasts) => [...prevToasts, { message, id }]);
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }, 3000); // Duration for the toast to disappear (3 seconds)
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div className="fixed top-5 left-1/2 transform -translate-x-1/2 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white text-gray-900 p-4 rounded-lg shadow-lg border border-gray-300 flex items-start space-x-3 relative"
          >
            <IoMdInformationCircle className="text-blue-500 w-5 h-5 mt-1" />
            <div className="flex-1">
              <div>{toast.message}</div>
              <div className="h-1 bg-blue-500 mt-2 relative">
                <div className="absolute top-0 left-0 h-full bg-blue-300 animate-toast-progress"></div>
              </div>
            </div>
            <button onClick={() => removeToast(toast.id)}>
              <IoIosClose className="text-gray-500 w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
