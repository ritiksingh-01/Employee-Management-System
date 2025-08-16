import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = () => {
  const [userData, setUserData, adminData, setAdminData] = useContext(AuthContext);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleDeleteTask = (employeeId, taskToDelete) => {
    if (!userData) return;

    const updatedUserData = userData.map(emp => {
      if (emp.id === employeeId) {
        const updatedTasks = emp.tasks.filter(task =>
          !(task.title === taskToDelete.title && task.date === taskToDelete.date)
        );
        const taskNumbers = {
          newTask: updatedTasks.filter(t => t.newTask).length,
          active: updatedTasks.filter(t => t.active).length,
          completed: updatedTasks.filter(t => t.completed).length,
          failed: updatedTasks.filter(t => t.failed).length
        };

        return {
          ...emp,
          tasks: updatedTasks,
          taskNumber: taskNumbers
        };
      }
      return emp;
    });

    setUserData(updatedUserData);
    localStorage.setItem('employees', JSON.stringify(updatedUserData));
    setShowDeleteConfirm(null);
  };

  const confirmDeleteTask = (employee, task) => {
    setShowDeleteConfirm({ employee, task });
  };

  const cancelDeleteTask = () => {
    setShowDeleteConfirm(null);
  };

  const toggleEmployeeExpansion = (employeeId) => {
    setExpandedEmployee(expandedEmployee === employeeId ? null : employeeId);
  };

  if (!userData || userData.length === 0) {
    return (
      <div className="bg-[#1C1C1C] p-5 mt-5 rounded">
        <div className="text-center text-gray-400">
          <p>No employee data available</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-[#1C1C1C] p-5 mt-5 rounded" id="allList">
        <div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded">
          <h2 className='text-lg font-medium w-1/5'>Employee Name</h2>
          <h3 className='text-lg font-medium w-1/5'>New Task</h3>
          <h5 className='text-lg font-medium w-1/5'>Active Task</h5>
          <h5 className='text-lg font-medium w-1/5'>Completed</h5>
          <h5 className='text-lg font-medium w-1/5'>Failed</h5>
          <h5 className='text-lg font-medium w-1/5'>Actions</h5>
        </div>
        <div className="h-[80%]">
          {userData.map(function (e, idx) {
            return (
              <div key={idx} className='border-2 border-emerald-500 mb-2 rounded overflow-hidden'>
                {/* Employee Summary Row */}
                <div className='py-2 px-4 flex justify-between items-center bg-gray-800'>
                  <h2 className='text-lg font-medium w-1/5'>{e.firstname}</h2>
                  <h3 className="text-lg font-medium w-1/5 text-blue-400">{e.taskNumber?.newTask || 0}</h3>
                  <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{e.taskNumber?.active || 0}</h5>
                  <h5 className='text-lg font-medium w-1/5 text-green-400'>{e.taskNumber?.completed || 0}</h5>
                  <h5 className='text-lg font-medium w-1/5 text-red-600'>{e.taskNumber?.failed || 0}</h5>
                  <div className='w-1/5 flex gap-2'>
                    <button
                      onClick={() => toggleEmployeeExpansion(e.id)}
                      className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-white text-sm transition-colors"
                    >
                      {expandedEmployee === e.id ? 'Hide' : 'View'} Tasks
                    </button>
                  </div>
                </div>
                {expandedEmployee === e.id && e.tasks && e.tasks.length > 0 && (
                  <div className="bg-gray-900 p-4">
                    <h4 className="text-md font-medium text-gray-300 mb-3">Task Details for {e.firstname}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {e.tasks.map((task, taskIdx) => (
                        <div key={taskIdx} className={`p-3 rounded border ${
                          task.newTask ? 'border-blue-400 bg-blue-900/20' :
                          task.active ? 'border-yellow-400 bg-yellow-900/20' :
                          task.completed ? 'border-green-400 bg-green-900/20' :
                          task.failed ? 'border-red-400 bg-red-900/20' : 'border-gray-400'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-xs px-2 py-1 rounded ${
                              task.newTask ? 'bg-blue-500' :
                              task.active ? 'bg-yellow-500' :
                              task.completed ? 'bg-green-500' :
                              task.failed ? 'bg-red-500' : 'bg-gray-500'
                            } text-white`}>
                              {task.newTask ? 'New' : task.active ? 'Active' : task.completed ? 'Completed' : task.failed ? 'Failed' : 'Unknown'}
                            </span>
                            <span className="text-xs text-gray-400">{task.date}</span>
                          </div>
                          <h5 className="font-medium text-gray-200 mb-1">{task.title}</h5>
                          <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">{task.category}</span>
                            {(task.completed || task.failed) && (
                              <button
                                onClick={() => confirmDeleteTask(e, task)}
                                className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded transition-colors"
                                title="Delete Task"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-200 mb-4">Confirm Task Deletion</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete the task <strong>"{showDeleteConfirm.task.title}"</strong> 
              from <strong>{showDeleteConfirm.employee.firstname}</strong>?
              <br />
              <span className="text-red-400 text-sm">This action cannot be undone.</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteTask(showDeleteConfirm.employee.id, showDeleteConfirm.task)}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-white font-medium transition-colors"
              >
                Delete Task
              </button>
              <button
                onClick={cancelDeleteTask}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllTask;
