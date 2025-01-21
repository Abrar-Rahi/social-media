import React from 'react';
import { Link } from 'react-router-dom';
import NotFoundSVG from '../../svg/NotFoundSVG';

const NotFound = () => {
  return (
    <>
    
    <div className=" flex items-center justify-center h-screen bg-white">
      
      <div className="text-center">
      <div className="">
          <NotFoundSVG/>
        </div>
        <h2 className="text-4xl font-gilroyBold text-black mt-4">Chit Chat</h2>
        <p className="text-black mt-2">
          Oops! The page you're looking for doesn't exist. It might have been removed or renamed.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 bg-blue text-white font-gilroySemiBold rounded-md shadow shadow-shadow hover:bg-primary_color transition-all duration-300"
        >
          Go Back to Home
        </Link>
        
      </div>
    </div>
    </>
  );
};

export default NotFound;
