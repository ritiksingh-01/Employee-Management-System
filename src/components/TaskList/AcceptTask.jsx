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
    <div className="flex-shrink-0 h-full w-[320px] rounded-2xl p-6 border border-gray-200 bg-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 shadow-lg">
          {data.category}
        </span>
        <div className='flex items-center space-x-2 text-gray-500'>
          <span className='text-sm font-medium'>{data.date}</span>
        </div>
      </div>
      
      <div className='mb-6'>
        <h2 className="text-xl font-bold text-gray-800 mb-3">
          {data.title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {data.description}
        </p>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-emerald-400 rounded-full'></div>
          <span className='text-xs font-semibold text-emerald-600 uppercase tracking-wide'>In Progress</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleMarkCompleted}
          disabled={isUpdating}
          className={`flex-1 py-2 px-3 rounded-xl font-semibold text-sm shadow-lg ${
            isUpdating 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-emerald-500 hover:bg-emerald-600 text-white'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Complete'}
        </button>
        <button 
          onClick={handleMarkFailed}
          disabled={isUpdating}
          className={`flex-1 py-2 px-3 rounded-xl font-semibold text-sm shadow-lg ${
            isUpdating 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-red-500 hover:bg-red-600 text-white'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Mark Failed'}
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;