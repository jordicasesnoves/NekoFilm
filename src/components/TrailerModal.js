import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

// Default animate.css 'faster' transition duration
const transitionDuration = 500;

export const TrailerModal = ({ isShowing, hide, trailerURL }) => {
  const [className, setClassName] = useState("fadeIn");

  const willHide = () => {
    setClassName("fadeOut");

    // We need to leave some time for the fadeOut transition happen
    setTimeout(() => {
      hide();

      // Reset to initial state
      setClassName("fadeIn");
    }, transitionDuration);
  };

  return isShowing
    ? ReactDOM.createPortal(
        <div
          className={`animated ${className} faster fixed px-4 py-16 inset-0 flex items-center justify-center`}
        >
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-700 opacity-75"></div>
          </div>
          <div
            className="absolute bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-6xl w-full"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline"
          >
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <iframe
                  className="rounded shadow-xl animated fadeIn"
                  frameBorder="0"
                  scrolling="no"
                  marginHeight="0"
                  marginWidth="0"
                  width="100%"
                  height="500px"
                  type="text/html"
                  src={`https://www.youtube.com/embed/${trailerURL}?autoplay=0&fs=0&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0`}
                />
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                <button
                  onClick={willHide}
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-red-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Close
                </button>
              </span>
              {/*<span className="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:w-auto">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                >
                  Cancel
                </button>
              </span>*/}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;
};
