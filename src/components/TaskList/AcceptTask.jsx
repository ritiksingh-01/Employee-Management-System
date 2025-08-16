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
    <div className="flex-shrink-0 h-full w-[320px] glass-effect rounded-2xl p-6 border border-amber-500/20 bg-gradient-to-br from-amber-500/10 to-orange-500/10 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg">
          {data.category}
        </span>
        <div className='flex items-center space-x-2 text-slate-400'>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className='text-sm font-medium'>{data.date}</span>
        </div>
      </div>
      
      <div className='mb-6'>
        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-amber-300 transition-colors">
          {data.title}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {data.description}
        </p>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-amber-400 rounded-full animate-pulse'></div>
          <span className='text-xs font-semibold text-amber-400 uppercase tracking-wide'>In Progress</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={handleMarkCompleted}
          disabled={isUpdating}
          className={`flex-1 py-2 px-3 rounded-xl font-semibold text-sm transition-all duration-200 transform shadow-lg ${
            isUpdating 
              ? 'bg-slate-600 cursor-not-allowed text-slate-400' 
              : 'bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Complete'}
        </button>
        <button 
          onClick={handleMarkFailed}
          disabled={isUpdating}
          className={`flex-1 py-2 px-3 rounded-xl font-semibold text-sm transition-all duration-200 transform shadow-lg ${
            isUpdating 
              ? 'bg-slate-600 cursor-not-allowed text-slate-400' 
              : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl'
          }`}
        >
          {isUpdating ? 'Updating...' : 'Mark Failed'}
        </button>
      </div>
    </div>
  );
};

export default AcceptTask;