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
    <div className='flex-shrink-0 h-full w-[320px] glass-effect rounded-2xl p-6 border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group'>
      <div className='flex items-center justify-between mb-4'>
        <span className='px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'>
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
        <h2 className='text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors'>
          {data.title}
        </h2>
        <p className='text-slate-300 text-sm leading-relaxed'>
          {data.description}
        </p>
      </div>

      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'></div>
          <span className='text-xs font-semibold text-blue-400 uppercase tracking-wide'>New Task</span>
        </div>
      </div>

      <button 
        onClick={handleAcceptTask}
        disabled={isUpdating}
        className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-200 transform shadow-lg ${
          isUpdating 
            ? 'bg-slate-600 cursor-not-allowed text-slate-400' 
            : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800'
        }`}
      >
        {isUpdating ? (
          <div className='flex items-center justify-center space-x-2'>
            <div className='w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin'></div>
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