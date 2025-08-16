import React from "react";

const FailedTask = ({ data, employeeId, onTaskDelete }) => {
  const handleDeleteTask = () => {
    if (onTaskDelete && window.confirm('Are you sure you want to delete this failed task?')) {
      onTaskDelete(data);
    }
  };

  return (
    <div className="flex-shrink-0 h-full w-[320px] glass-effect rounded-2xl p-6 border border-red-500/20 bg-gradient-to-br from-red-500/10 to-red-600/10 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg">
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
        <h2 className="text-xl font-bold text-white mb-3 group-hover:text-red-300 transition-colors">
          {data.title}
        </h2>
        <p className="text-slate-300 text-sm leading-relaxed">
          {data.description}
        </p>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className='text-xs font-semibold text-red-400 uppercase tracking-wide'>Failed</span>
        </div>
      </div>

      <button 
        onClick={handleDeleteTask}
        className="w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-red-500 hover:to-red-600 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-800"
      >
        Remove Task
      </button>
    </div>
  );
};

export default FailedTask;