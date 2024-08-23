


// import React from 'react';

// const ProjectTimesheet = () => {

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Project Timesheet</h1>
      
//     </div>
//   );
// };

// export default ProjectTimesheet;




'use client'

import React, { useState } from 'react';
import FixedHeader from '../components/Header';
import SheetsSent from './SheetSentForm';

// Icons (you may want to use an icon library or SVGs instead)
const ClockIcon = () => <span>🕒</span>;
const EditIcon = () => <span>✏️</span>;
const DeleteIcon = () => <span>🗑️</span>;

const ProjectTimesheet = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Box of Crayons', times: ['08:00', '08:00', '08:00', '08:00', '08:00', '05:00', '05:00'], total: '50' },
    { id: 2, name: 'Gob Geeklords', times: ['08:00', '04:00', '04:00', '08:00', '08:00', '08:00', '08:00'], total: '48' },
    { id: 3, name: 'Java Dalia', times: ['08:00', '08:00', '08:00', '08:00', '08:00', '08:00', '08:00'], total: '56' },
    { id: 4, name: 'Practice to Perfect', times: ['08:00', '08:00', '08:00', '08:00', '08:00', '06:20', '08:00'], total: '54.20' },
    { id: 5, name: 'Project Name Select', times: ['-:--', '-:--', '-:--', '-:--', '-:--', '-:--', '-:--'], total: '00' },
  ]);
  const [isSheetsSentOpen, setIsSheetsSentOpen] = useState(false);

  const days = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'];

  return (
    <div className="container mx-auto lg:ml-64 mt-16 sm:mt-20 p-4">
      <FixedHeader />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Project Timesheet</h1>
        <button 
          className="bg-purple-900 text-white px-4 py-2 rounded-md"
          onClick={() => setIsSheetsSentOpen(true)}
        >
          Sheets Sent
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center ml-4 mt-4">
            <span className="mr-2">Show</span>
            <select className="border rounded-md p-1">
              <option>10</option>
            </select>
            <span className="ml-2">entries</span>
          </div>
          <div className="mr-4 mt-2">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-md p-1"
            />
          </div>
        </div>

        <div className="grid grid-cols-9 gap-2 bg-gray-100 p-2 font-bold">
          <div>PROJECT NAME</div>
          {days.map((day) => (
            <div key={day}>{day}</div>
          ))}
          <div>TOTAL</div>
        </div>

        {projects.map((project) => (
          <div key={project.id} className="grid grid-cols-9 gap-2 border-b p-2">
            <div>
              <select className="w-full bg-gray-100 rounded-md p-1">
                <option>{project.name}</option>
              </select>
            </div>
            {project.times.map((time, index) => (
              <div key={index} className="relative">
                <input
                  type="text"
                  value={time}
                  className="w-full bg-gray-100 rounded-md p-1 pr-6"
                />
                <ClockIcon className="absolute right-2 top-1/2 transform -translate-y-1/2" />
              </div>
            ))}
            <div className="bg-green-200 rounded-md p-1 text-center">
              {project.total}
            </div>
            <div className="flex space-x-2 items-center">
              <button className="text-blue-500">
                <EditIcon />
              </button>
              <button className="text-red-500">
                <DeleteIcon />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isSheetsSentOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <SheetsSent onClose={() => setIsSheetsSentOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectTimesheet;