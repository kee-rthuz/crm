



import React from 'react';
import { UserPlus, Star, FileText } from 'lucide-react';
import FixedHeader from '../components/Header';

const EmployeeCard = ({ name, role, description, tasks, rating, documents }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex">
    <div className="mr-4">
      <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-semibold">{name}</h3>
      <span className={`inline-block px-2 py-1 text-sm rounded ${role === 'UI/UX Designer' ? 'bg-purple-200 text-purple-800' : 'bg-green-200 text-green-800'}`}>
        {role}
      </span>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      <div className="mt-4 flex space-x-4">
        <div className="flex items-center">
          <FileText size={16} className="text-gray-400 mr-1" />
          <span className="text-sm">{tasks}</span>
        </div>
        <div className="flex items-center">
          <Star size={16} className="text-yellow-400 mr-1" />
          <span className="text-sm">{rating}</span>
        </div>
        <div className="flex items-center">
          <FileText size={16} className="text-gray-400 mr-1" />
          <span className="text-sm">{documents}</span>
        </div>
      </div>
      <div className="mt-4 space-x-2">
        <button className="px-3 py-1 bg-purple-900 text-white rounded-md text-sm">
          {tasks === '00' ? 'First Task' : 'Add Task'}
        </button>
        <button className="px-3 py-1 bg-purple-900 text-white rounded-md text-sm">Profile</button>
      </div>
    </div>
  </div>
);

const EmployeeDashboard = () => {
  return (
    <div className="container mx-auto lg:ml-64 mt-16 sm:mt-20 p-4">
        <FixedHeader />
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl  font-bold">Employee</h2>
            <div className="flex ml-4 space-x-2">
                <button className="px-3 py-1 bg-purple-900 text-white rounded-md">
                <span className="flex items-center">
                    <UserPlus size={16} className="mr-1" />
                    Add Employee
                </span>
                </button>
                <button className="px-3  py-1 bg-purple-900 text-white rounded-md">
                Status
                </button>
            </div>
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <EmployeeCard
          name="Luke Short"
          role="UI/UX Designer"
          description="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices"
          tasks="04"
          rating="4.5"
          documents="04"
        />
        <EmployeeCard
          name="Lillian Powell"
          role="Quality Assurance"
          description="Vestibulum ante ipsum primis in faucibus orci luctus et ultrices.Vestibulum ante ipsum primis in faucibus orci luctus et ultrices"
          tasks="00"
          rating="00"
          documents="00"
        />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
