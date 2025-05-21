import React from 'react';

const Spinner = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-900 text-white">
            <div className="w-16 h-16 border-4 border-t-transparent border-green-500 rounded-full animate-spin"></div>
            {/* <p className="mt-4 text-lg text-green-300">Loading...</p> */}
        </div>
    );
};

export default Spinner;
