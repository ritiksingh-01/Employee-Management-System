import React from "react";

const FailedTask = ({ data, employeeId, onTaskDelete }) => {
  const handleDeleteTask = () => {
    if (onTaskDelete && window.confirm('Are you sure you want to delete this failed task?')) {
      onTaskDelete(data);
    }
  };

  return (
    <div className="flex-shrink-0 h-full w-[320px] rounded-2xl p-6 border border-gray-200 bg-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 shadow-lg">
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
          <span className='text-xs font-semibold text-red-600 uppercase tracking-wide'>Failed</span>
        </div>
      </div>

      <button 
        onClick={handleDeleteTask}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg"
      >
        Remove Task
      </button>
    </div>
  );
};

export default FailedTask;