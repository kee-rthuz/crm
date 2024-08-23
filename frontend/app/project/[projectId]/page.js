

'use client'; // Add this directive to make the component client-side

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Import useRouter from 'next/navigation' in Next.js 13+
import TaskForm from './AddTaskForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHourglass,
  faCheckCircle,
  faSpinner,
  faComment, // Import the comment icon
} from '@fortawesome/free-solid-svg-icons';

const getStatusIcon = (status) => {
  switch (status) {
    case 'No Progress':
      return faHourglass;
    case 'In Progress':
      return faSpinner;
    case 'Complete':
      return faCheckCircle;
    default:
      return null;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'No Progress':
      return '#aaa';
    case 'In Progress':
      return 'orange';
    case 'Complete':
      return 'green';
    default:
      return '';
  }
};

export default function KanbanBoard() {
  const router = useRouter(); // Use the Next.js router
  const [doingCollapsed, setDoingCollapsed] = useState(false);
  const [doneCollapsed, setDoneCollapsed] = useState(false);
  const [notDoingCollapsed, setNotDoingCollapsed] = useState(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  const [notDoingTasks, setNotDoingTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  const handleAddTask = () => {
    setIsTaskFormOpen(true);
  };

  const handleCloseTaskForm = () => {
    setIsTaskFormOpen(false);
  };

  const handleTaskAdded = (newTask) => {
    if (newTask.assignedTo === "" || newTask.assignedTo === "Unassigned") {
      setNotDoingTasks((prev) => [...prev, newTask]);
    } else {
      setDoingTasks((prev) => [...prev, newTask]);
    }
    setIsTaskFormOpen(false);
  };

  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    const options = { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true 
    };
    const formattedDate = date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit' 
    }) + ' ' + date.toLocaleTimeString('en-US', options);
    return formattedDate;
  };

  const handleCommentClick = () => {
    router.push('/comments'); // Navigate to the comments page when the comment icon is clicked
  };

  return (
    <div className="container mx-auto lg:ml-64 mt-16 sm:mt-20 p-4">
      <div className="bg-white w-[111%] rounded-lg p-4 mb-14 -mt-24 h-[10vh] shadow">       
        <button
          className="bg-purple-900 text-white py-2 px-4 mt-2 rounded float-right"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>

      <div className="max-w-6xl ml-6">
        {[
          { section: 'Not Doing', tasks: notDoingTasks, collapsed: notDoingCollapsed, setCollapsed: setNotDoingCollapsed },
          { section: 'Doing', tasks: doingTasks, collapsed: doingCollapsed, setCollapsed: setDoingCollapsed },
          { section: 'Done', tasks: doneTasks, collapsed: doneCollapsed, setCollapsed: setDoneCollapsed }
        ].map(({ section, tasks, collapsed, setCollapsed }, index) => (
          <div key={section} className={`mb-${index === 2 ? '4' : '14'}`}>
            <h2 
              className="text-lg font-semibold mb-2 flex items-center cursor-pointer"
              onClick={() => setCollapsed(!collapsed)}
            >
              <span className="mr-2">
                {collapsed ? '▶' : '▼'}
              </span>
              {section}
            </h2>
            {!collapsed && (
              <div className="bg-white rounded shadow p-2">
                {tasks.length > 0 ? (
                  tasks.map((task, i) => (
                    <div key={i} className="flex items-center justify-between mb-2 text-gray-800 bg-gray-100 p-2 rounded transition-colors duration-300">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <FontAwesomeIcon
                            icon={getStatusIcon(task.status)}
                            color={getStatusColor(task.status)}
                            size="lg"
                          />
                        </div>

                        <div className="font-semibold ml-2">{task.title}</div>

                        <div className="font-semibold ml-4">{task.assignedTo}</div>

                        <div className="text-gray-600 ml-4 font-semibold flex items-center">
                          {formatDateWithTime(task.dueDate)}
                          <FontAwesomeIcon 
                            icon={faComment} 
                            className="ml-4 cursor-pointer" 
                            onClick={handleCommentClick} 
                          />
                        </div>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="text-gray-500">No tasks available</div>
                )}
                <button 
                  className="w-full font-semibold text-left text-gray-500 hover:bg-gray-100 p-2 rounded transition-colors duration-300"
                  onClick={handleAddTask}
                >
                  + Task Add
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {isTaskFormOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">
          <div>
            <TaskForm onClose={handleCloseTaskForm} onTaskAdded={handleTaskAdded} />
          </div>
        </div>
      )}
    </div>
  );
}
