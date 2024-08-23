import React from 'react';

const SheetsSent = ({ onClose }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Sheets Sent</h2>
        <button 
          className="text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email address
        </label>
        <input
          type="email"
          id="email"
          className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
          placeholder="name@example.com"
          readOnly
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button 
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          onClick={onClose}
        >
          Done
        </button>
        <button className="px-4 py-2 bg-purple-900 text-white rounded-md ">
          sent
        </button>
      </div>
    </div>
  );
};

export default SheetsSent;