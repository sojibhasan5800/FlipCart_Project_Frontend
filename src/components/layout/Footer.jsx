import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">&copy; 2025 Alex-SB LTD. All rights reserved.</p>
          </div>
          
          <div className="flex flex-wrap justify-center space-x-6 text-sm mb-4 md:mb-0">
            <span>info@pixsellz.io</span>
            <span>+879-332-9375</span>
            <span>Street name 123, Avenue abc</span>
          </div>
          
          <div className="flex space-x-4">
            <span className="text-lg">Accepted Payments:</span>
            <div className="flex space-x-2">
              <span>💳</span>
              <span>📱</span>
              <span>🏦</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;