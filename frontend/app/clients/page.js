import React from 'react';
import { MessageSquare, User, Edit, Trash2 } from 'lucide-react';
import FixedHeader from '../components/Header';

const ClientCard = ({ name, company, role, description }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex flex-col md:flex-row">
    <div className="mr-4 mb-4 md:mb-0">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
        <User size={32} />
      </div>
    </div>
    <div className="flex-grow">
      <h3 className="text-lg font-semibold">{company}</h3>
      <p className="text-sm text-gray-600">{name}</p>
      <p className="mt-2 text-sm text-gray-700">{description}</p>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">{role}</span>
        </div>
        <div className="flex space-x-2">
          <button className="bg-purple-900 text-white px-3 py-1 rounded-md text-sm flex items-center">
            <MessageSquare size={16} className="mr-1" /> Chat
          </button>
          <button className="bg-purple-900 text-white px-3 py-1 rounded-md text-sm flex items-center">
            <User size={16} className="mr-1" /> Profile
          </button>
        </div>
      </div>
    </div>
    <div className="flex flex-col  justify-between items-end md:flex-row md:items-center md:space-x-2">
      <div className="flex space-x-2">
        <button className="text-green-600 hover:text-green-800">
          <Edit size={16} />
        </button>
        <button className="text-red-600 hover:text-red-800">
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </div>
);

const ClientList = () => {
  const clients = [
    { name: 'Ryan Ogden', company: 'AgilSoft Tech', role: 'CEO', description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices' },
    { name: 'Matt Gibson', company: 'Macrosoft', role: 'Manager', description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices' },
    { name: 'Ryan Ogden', company: 'AgilSoft Tech', role: 'CEO', description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices' },
    { name: 'Matt Gibson', company: 'Macrosoft', role: 'Manager', description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices' },
  ];

  return (
    <div className="container mx-auto p-4 lg:ml-64 mt-16 sm:mt-20">
      <FixedHeader />
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <div className="flex space-x-2 mt-2 md:mt-0">
          <button className="bg-purple-900 text-white px-3 py-2 rounded-md text-sm">Status</button>
          <button className="bg-purple-900 text-white px-3 py-2 rounded-md text-sm">+ Add Client</button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map((client, index) => (
          <ClientCard key={index} {...client} />
        ))}
      </div>
    </div>
  );
};

export default ClientList;
