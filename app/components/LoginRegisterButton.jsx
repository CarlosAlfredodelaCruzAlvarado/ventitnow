import React, { useState } from 'react';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import LoginModal from './LoginModal'; // Import the LoginModal component
import RegisterModal from './RegisterModal'; // Import the RegisterModal component

const LoginRegisterButton = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  return (
    <>
      <div className="flex justify-end space-x-4 my-3 mr-5">
        {/* Login Button */}
        <button
          className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:text-white dark:focus:ring-blue-800"
          onClick={() => setShowLoginModal(true)}
        >
          <span className="flex items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <FaSignInAlt className="text-blue-500 mr-2 transition-colors duration-200 ease-in-out group-hover:text-white" />
            <span>Login</span>
          </span>
        </button>

        {/* Register Button */}
        <button
          className="group relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:text-white dark:focus:ring-green-800"
          onClick={() => setShowRegisterModal(true)}
        >
          <span className="flex items-center relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            <FaUserPlus className="text-green-500 mr-2 transition-colors duration-200 ease-in-out group-hover:text-white" />
            <span>Register</span>
          </span>
        </button>
      </div>

      {/* Render Modals */}
      <LoginModal showModal={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <RegisterModal showModal={showRegisterModal} onClose={() => setShowRegisterModal(false)} />
    </>
  );
};

export default LoginRegisterButton;
