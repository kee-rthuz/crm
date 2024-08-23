



import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';
import FixedHeader from '../components/Header';

const statisticsData = [
  { name: 'Today', value: 2, total: 8 },
  { name: 'This Week', value: 1, total: 40 },
  { name: 'This Month', value: 2, total: 160 },
  { name: 'Overtime', value: 15.5, total: 24 },
  { name: 'Remaining', value: 1, total: 8 },
];

const recentActivity = [
  { type: 'PH', label: 'Punch In at', time: '10 Am' },
  { type: 'PO', label: 'Punch Out at', time: '11:30 Am' },
  { type: 'BR', label: 'Break Time', time: '1 Pm to 2 Pm' },
  { type: 'PO', label: 'Punch IN at', time: '2:10 Pm' },
  { type: 'PO', label: 'Punch Out at', time: '7:30 Pm' },
];

const timeEntries = [
  { date: 'June 26, 2021', punchIn: '10:05 AM', punchOut: '09:05 PM', breakTime: '01:12 Hr', halfDay: false, fullDay: true, overtime: '01:39 Hr', totalProduction: '09:39 Hr' },
  { date: 'June 25, 2021', punchIn: '10:05 AM', punchOut: '09:05 PM', breakTime: '01:12 Hr', halfDay: false, fullDay: true, overtime: '01:39 Hr', totalProduction: '09:39 Hr' },
  { date: 'June 24, 2021', punchIn: '10:00 AM', punchOut: '02:00 PM', breakTime: '00:00', halfDay: true, fullDay: false, overtime: '00:00', totalProduction: '04:00 Hr' },
];

const Dashboard = () => {
  return (
    <div className="container mx-auto lg:ml-64 mt-16 sm:mt-20 p-4">
        <FixedHeader />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Statistics</h2>
          <div className="space-y-2">
            {statisticsData.map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="w-24 text-sm">{item.name}</span>
                <div className="flex-grow">
                  <div className="bg-gray-200 h-2 rounded-full">
                    <div
                      className={`h-2 rounded-full ${
                        index === 0 ? 'bg-purple-500' :
                        index === 1 ? 'bg-blue-500' :
                        index === 2 ? 'bg-green-500' :
                        index === 3 ? 'bg-orange-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${(item.value / item.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <span className="w-16 text-right text-sm">{item.value}/{item.total}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${
                  activity.type === 'PH' ? 'bg-green-500' :
                  activity.type === 'PO' ? 'bg-red-500' :
                  'bg-yellow-500'
                }`}>
                  {activity.type}
                </div>
                <div className="ml-4">
                  <p className="font-medium">{activity.label}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <div>
            Show
            <select className="mx-2 border rounded">
              <option>10</option>
            </select>
            entries
          </div>
          <div>
            <input type="text" placeholder="Search" className="border rounded px-2 py-1" />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left p-2">#</th>
              <th className="text-left p-2">DATE</th>
              <th className="text-left p-2">PUCHIN TIME</th>
              <th className="text-left p-2">PUCHOUT TIME</th>
              <th className="text-left p-2">BREAK TIME</th>
              <th className="text-left p-2">HALF DAY</th>
              <th className="text-left p-2">FULL DAY</th>
              <th className="text-left p-2">OVERTIME</th>
              <th className="text-left p-2">TOTAL PRODUCTION</th>
            </tr>
          </thead>
          <tbody>
            {timeEntries.map((entry, index) => (
              <tr key={index} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{entry.date}</td>
                <td className="p-2">{entry.punchIn}</td>
                <td className="p-2">{entry.punchOut}</td>
                <td className="p-2">{entry.breakTime}</td>
                <td className="p-2">{entry.halfDay ? '✓' : '✗'}</td>
                <td className="p-2">{entry.fullDay ? '✓' : '✗'}</td>
                <td className="p-2">{entry.overtime}</td>
                <td className="p-2 text-green-600">{entry.totalProduction}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;