import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AcceptTask = ({ data, employeeId, onTaskUpdate }) => {
  const [userData, setUserData, adminData, setAdminData] = useContext(AuthContext);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleMarkCompleted = async () => {
    if (!onTaskUpdate || isUpdating) return;
    
    setIsUpdating(true);
    try {
      const updatedTask = { ...data, active: false, completed: true, newTask: false };
      onTaskUpdate(updatedTask, 'completed');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleMarkFailed = async () => {
    if (!onTaskUpdate || isUpdating) return;
    
    setIsUpdating(true);
    try {
      const updatedTask = { ...data, active: false, failed: true, newTask: false };
      onTaskUpdate(updatedTask, 'failed');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] bg-red-400 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="px-3 py-1 text-sm rounded bg-red-600">
          {data.category}
        </h3>
        <h4 className="text-sm">{data.date}</h4>
      </div>
      <h2 className="mt-3 text-2xl font-semibold">{data.title}</h2>
      <p className="text-sm mt-2">{data.description}</p>
      <div className="flex justify-between mt-6">
        <button 
          onClick={handleMarkCompleted}
          disabled={isUpdating}
          className={`py-1 px-2 text-sm rounded cursor-pointer font-semibold transition-all duration-200 ${
            isUpdating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-green-500 hover:bg-green-600 active:bg-green-700'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Mark as Completed'}
        </button>
        <button 
          onClick={handleMarkFailed}
          disabled={isUpdating}
          className={`py-1 px-2 text-sm rounded cursor-pointer font-semibold transition-all duration-200 ${
            isUpdating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-red-500 hover:bg-red-600 active:bg-red-700'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Mark as Failed'}
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;
