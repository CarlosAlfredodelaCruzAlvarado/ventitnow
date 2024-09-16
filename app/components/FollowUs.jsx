'use client'
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const FollowUs = () => {
  return (
    <div className="flex flex-col items-center mt-8 space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Follow Us On</h2>
      <div className="flex space-x-6">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 transition-colors duration-300"
          aria-label="Facebook"
        >
          <FaFacebookF size={24} />
        </a>

        {/* Instagram */}
        <a
          href="https://www.instagram.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-pink-500 hover:text-pink-700 transition-colors duration-300"
          aria-label="Instagram"
        >
          <FaInstagram size={24} />
        </a>

        {/* Twitter/X */}
        <a
          href="https://twitter.com/yourpage"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:text-blue-600 transition-colors duration-300"
          aria-label="Twitter"
        >
          <FaTwitter size={24} />
        </a>
      </div>
    </div>
  );
};

export default FollowUs;
