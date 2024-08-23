import React from 'react';
import { Search, Bell, Menu } from 'lucide-react';

const FixedHeader = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-4">
          {/* Mobile menu button */}
          <div className="flex items-center mt-4 ml-4 lg:hidden">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>



          {/* Search bar */}
          <div className="flex-1 ">
            <div className="max-w-lg w-full lg:max-w-xs">
              <label htmlFor="search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  id="search"
                  name="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Search"
                  type="search"
                />
              </div>
            </div>
          </div>

          {/* Notification bell and user profile */}
          <div className="flex items-center lg:ml-4">
            <button className="flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="sr-only">View notifications</span>
              <Bell className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div className="flex items-center">
                <img
                  className="h-8 w-8 rounded-full"
                  src="/api/placeholder/32/32"
                  alt="User avatar"
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default FixedHeader;