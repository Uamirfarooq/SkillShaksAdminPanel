import React from 'react';
// import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold mb-3">Contact Support</h3>
            <p className="text-sm mb-1">Email: <a href="mailto:admin-support@learnplatform.com" className="hover:text-indigo-400 transition duration-300">mrumair775@gmail.com</a></p>
            <p className="text-sm">Phone: <a href="tel:1234567890" className="hover:text-indigo-400 transition duration-300">(123) 456-7890</a></p>
          </div>
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-6">
              {/* <a href="#" className="hover:text-indigo-400 transition duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-indigo-400 transition duration-300">
                <FaLinkedinIn size={20} />
              </a> */}
            </div>
          </div>
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0 text-sm">
            <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
            <ul>
              {/* <li className="mb-2"><a href="#" className="hover:text-indigo-400 transition duration-300">About Us</a></li>
              <li className="mb-2"><a href="#" className="hover:text-indigo-400 transition duration-300">Terms of Service</a></li>
              <li className="mb-2"><a href="#" className="hover:text-indigo-400 transition duration-300">Privacy Policy</a></li>
              <li className="mb-2"><a href="#" className="hover:text-indigo-400 transition duration-300">Help Center</a></li> */}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">© 2024 LearnPlatform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
