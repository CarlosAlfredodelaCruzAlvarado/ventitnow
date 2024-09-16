import React from 'react';

const Footer = () => {
  return (
    <div className="flex flex-col items-end mt-8 space-y-4 text-gray-600 dark:text-gray-400 text-xs">
      <div className="flex space-x-2">
        <a 
          href="/legal?tab=about" 
          className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300"
        >
          About
        </a>
        <a 
          href="/legal?tab=terms" 
          className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300"
        >
          Terms & Conditions
        </a>
        <a 
          href="/legal?tab=privacy" 
          className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300"
        >
          Privacy Policy
        </a>
        <a 
          href="/legal?tab=faq" 
          className="hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300"
        >
          FAQ
        </a>
      </div>
      <div>
        <p>VentItNow © {new Date().getFullYear()}</p>
      </div>
    </div>
  );
  
};

export default Footer;
