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
    <div className='flex-shrink-0 h-full w-[300px] bg-green-400 rounded-xl p-5'>
      <div className='flex items-center justify-between'>
        <h3 className='px-3 py-1 text-sm rounded bg-red-600'>{data.category}</h3>
        <h4 className='text-sm'>{data.date}</h4>
      </div>
      <h2 className='mt-3 text-2xl font-semibold'>{data.title}</h2>
      <p className='text-sm mt-2'>{data.description}</p>
      <div className='mt-6'>
        <button 
          onClick={handleAcceptTask}
          disabled={isUpdating}
          className={`w-full py-1 px-2 text-sm rounded cursor-pointer font-semibold transition-all duration-200 ${
            isUpdating 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700'
          }`}
        >
          {isUpdating ? 'Accepting...' : 'Accept Task'}
        </button>
      </div>
    </div>
  )
}

export default NewTask