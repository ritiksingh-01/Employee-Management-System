import React from "react";

const FailedTask = ({ data, employeeId, onTaskDelete }) => {
  const handleDeleteTask = () => {
    if (onTaskDelete && window.confirm('Are you sure you want to delete this failed task?')) {
      onTaskDelete(data);
    }
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] bg-orange-400 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="px-3 py-1 text-sm rounded bg-red-600">{data.category}</h3>
        <h4 className="text-sm">{data.date}</h4>
      </div>
      <h2 className="mt-3 text-2xl font-semibold">{data.title}</h2>
      <p className="text-sm mt-2">
        {data.description}
      </p>
      <div className="mt-6">
        <button 
          onClick={handleDeleteTask}
          className="w-full bg-red-500 hover:bg-red-600 active:bg-red-700 py-1 px-2 text-sm rounded cursor-pointer font-semibold transition-all duration-200 text-white"
        >
          Delete Task
        </button>
      </div>
    </div>
  );
};

export default FailedTask;
