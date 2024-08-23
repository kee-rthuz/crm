import React from 'react';
import { Check, Circle, X } from 'lucide-react';
import FixedHeader from '../components/Header';

const AttendanceTable = () => {
  const employees = [
    { name: 'Joan Dyer', attendance: [1,1,1,0.5,1,1,1,1,1,0.5,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
    { name: 'Ryan Randall', attendance: [0,1,1,1,1,1,0,1,1,1,1,1,0.5,1,1,0,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1] },
    { name: 'Phil Glover', attendance: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1] },
    { name: 'Victor Rampling', attendance: [1,0.5,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1] },
    { name: 'Sally Graham', attendance: [1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.5,1,1,1,1,1,1,1,1,1,1,1,0.5] },
    { name: 'Robert Anderson', attendance: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
    { name: 'Ryan Stewart', attendance: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0.5,0.5] },
  ];

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const renderAttendanceIcon = (status) => {
    if (status === 1) return <Check className="text-green-500 mx-auto" size={16} />;
    if (status === 0.5) return <Circle className="text-yellow-500 mx-auto" size={16} fill="yellow" />;
    if (status === 0) return <X className="text-red-500 mx-auto" size={16} />;
    return <span className="text-gray-300">-</span>;
  };

  return (
    <div className="container mx-auto lg:ml-64 mt-16 sm:mt-20 p-4">
      <FixedHeader />
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Attendance (Admin)</h1>
        <div className="space-x-2">
          <button className="bg-purple-900  text-white px-4 py-2 rounded">Edit Attendance</button>
          <button className="bg-purple-900  text-white px-4 py-2 rounded">Filter</button>
        </div>
      </div>
      
      <div className="mb-4 flex space-x-4 text-sm">
        <div className="flex items-center">
          <Check className="text-green-500 mr-1" size={16} />
          <span>Full Day Present</span>
        </div>
        <div className="flex items-center">
          <Circle className="text-yellow-500 mr-1" size={16} fill="yellow" />
          <span>Half Day Present</span>
        </div>
        <div className="flex items-center">
          <X className="text-red-500 mr-1" size={16} />
          <span>Full Day Absence</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 border-b border-r font-medium text-left">EMPLOYEE</th>
              {days.map(day => (
                <th key={day} className="py-2 px-2 border-b border-r font-medium text-center">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={employee.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="py-2 px-4 border-b border-r font-medium">{employee.name}</td>
                {employee.attendance.map((status, dayIndex) => (
                  <td key={dayIndex} className="py-2 px-2 border-b border-r text-center">
                    {renderAttendanceIcon(status)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;