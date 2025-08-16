import React, { useState } from 'react'

const NewTask = ({ data, employeeId, onTaskUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleAcceptTask = async () => {
    if (!onTaskUpdate || isUpdating) return;
    
    setIsUpdating(true);
    try {
      const updatedTask = { ...data, newTask: false, active: true };
      onTaskUpdate(updatedTask, 'accepted');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className='flex-shrink-0 h-full w-[320px] rounded-2xl p-6 border border-gray-200 bg-white shadow-lg'>
      <div className='flex items-center justify-between mb-4'>
        <span className='px-3 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 shadow-lg'>
          {data.category}
        </span>
        <div className='flex items-center space-x-2 text-gray-500'>
          <span className='text-sm font-medium'>{data.date}</span>
        </div>
      </div>
      
      <div className='mb-6'>
        <h2 className='text-xl font-bold text-gray-800 mb-3'>
          {data.title}
        </h2>
        <p className='text-gray-600 text-sm leading-relaxed'>
          {data.description}
        </p>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-emerald-400 rounded-full'></div>
          <span className='text-xs font-semibold text-emerald-600 uppercase tracking-wide'>New Task</span>
        </div>
      </div>

      <button 
        onClick={handleAcceptTask}
        disabled={isUpdating}
        className={`w-full py-3 px-4 rounded-xl font-semibold shadow-lg ${
          isUpdating 
            ? 'bg-gray-400 cursor-not-allowed text-white' 
            : 'bg-emerald-500 hover:bg-emerald-600 text-white'
        }`}
      >
        {isUpdating ? (
          <div className='flex items-center justify-center space-x-2'>
            <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
            <span>Accepting...</span>
          </div>
        ) : (
          'Accept Task'
        )}
      </button>
    </div>
  )
}

export default NewTask