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

  const getStatusColor = (task) => {
    if (task.newTask) return 'bg-blue-100 text-blue-800';
    if (task.active) return 'bg-green-100 text-green-800';
    if (task.completed) return 'bg-gray-100 text-gray-800';
    if (task.failed) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  const getStatusTextColor = (task) => {
    if (task.newTask) return 'text-blue-800';
    if (task.active) return 'text-green-800';
    if (task.completed) return 'text-gray-800';
    if (task.failed) return 'text-red-800';
    return 'text-gray-800';
  };

  const getStatusText = (task) => {
    if (task.newTask) return 'New';
    if (task.active) return 'Active';
    if (task.completed) return 'Completed';
    if (task.failed) return 'Failed';
    return 'Unknown';
  };

  if (!userData || userData.length === 0) {
    return (
      <div className="rounded-2xl p-8 border border-gray-200 shadow-xl bg-white">
        <div className="text-center text-gray-600">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="text-lg font-medium">No employee data available</p>
          <p className="text-sm">Add employees to start managing tasks</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl p-6 border border-gray-200 shadow-xl bg-white">
        <div className="flex items-center space-x-3 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Task Overview</h2>
            <p className="text-gray-600 text-sm">Monitor all team tasks and progress</p>
          </div>
        </div>

        {/* Header Row */}
        <div className="bg-gray-100 rounded-xl p-4 mb-4 grid grid-cols-6 gap-4 text-sm font-semibold text-gray-700 shadow-lg">
          <div>Employee</div>
          <div className="text-center">New</div>
          <div className="text-center">Active</div>
          <div className="text-center">Completed</div>
          <div className="text-center">Failed</div>
          <div className="text-center">Actions</div>
        </div>

        <div className="space-y-3" id="allList">
          {userData.map((employee, idx) => (
            <div key={idx} className='rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 transition-all duration-200 shadow-lg hover:shadow-xl bg-gray-50'>
              {/* Employee Summary Row */}
              <div className='p-4 grid grid-cols-6 gap-4 items-center'>
                <div className="flex items-center space-x-3">
                  <div>
                    <div className='font-semibold text-gray-800'>{employee.firstname}</div>
                    <div className='text-xs text-gray-600'>{employee.id}</div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-lg font-bold">
                    {employee.taskNumber?.newTask || 0}
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-lg font-bold">
                    {employee.taskNumber?.active || 0}
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-lg font-bold">
                    {employee.taskNumber?.completed || 0}
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-100 text-emerald-800 rounded-lg font-bold">
                    {employee.taskNumber?.failed || 0}
                  </span>
                </div>
                <div className='text-center'>
                  <button
                    onClick={() => toggleEmployeeExpansion(employee.id)}
                    className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {expandedEmployee === employee.id ? 'Hide' : 'View'} Tasks
                  </button>
                </div>
              </div>

              {/* Expanded Task Details */}
              {expandedEmployee === employee.id && employee.tasks && employee.tasks.length > 0 && (
                <div className="bg-white p-6 border-t border-gray-200">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">
                    Tasks for {employee.firstname}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {employee.tasks.map((task, taskIdx) => (
                      <div key={taskIdx} className="bg-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all duration-200 group hover:scale-[1.02] shadow-lg hover:shadow-xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusColor(task)} shadow-lg`}>
                            {getStatusText(task)}
                          </span>
                          <span className="text-xs text-gray-600 font-medium">{task.date}</span>
                        </div>
                        <h5 className="font-bold text-gray-800 mb-2 group-hover:text-gray-700 transition-colors">{task.title}</h5>
                        <p className="text-sm text-gray-600 mb-3 leading-relaxed">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-700 bg-gray-100 px-2 py-1 rounded-full font-medium">{task.category}</span>
                          {(task.completed || task.failed) && (
                            <button
                              onClick={() => confirmDeleteTask(employee, task)}
                              className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 text-sm font-medium"
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
          ))}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border border-gray-200 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <h3 className="text-lg font-bold text-gray-800">Confirm Task Deletion</h3>
            </div>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Are you sure you want to delete the task <span className="font-semibold text-gray-800">"{showDeleteConfirm.task.title}"</span> 
              from <span className="font-semibold text-gray-800">{showDeleteConfirm.employee.firstname}</span>?
              <br />
              <span className="text-gray-500 text-sm font-medium">This action cannot be undone.</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteTask(showDeleteConfirm.employee.id, showDeleteConfirm.task)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Delete Task
              </button>
              <button
                onClick={cancelDeleteTask}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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