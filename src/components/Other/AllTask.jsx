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
    if (task.newTask) return 'from-blue-500 to-cyan-500';
    if (task.active) return 'from-amber-500 to-orange-500';
    if (task.completed) return 'from-emerald-500 to-green-500';
    if (task.failed) return 'from-red-500 to-red-600';
    return 'from-slate-500 to-slate-600';
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
      <div className="glass-effect rounded-2xl p-8 border border-slate-600 shadow-xl">
        <div className="text-center text-slate-400">
          <svg className="w-16 h-16 mx-auto mb-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      <div className="glass-effect rounded-2xl p-6 border border-slate-600 shadow-xl">
        <div className="flex items-center space-x-3 mb-6">
          <div className='w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg'>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Task Overview</h2>
            <p className="text-slate-400 text-sm">Monitor all team tasks and progress</p>
          </div>
        </div>

        {/* Header Row */}
        <div className="bg-gradient-to-r from-slate-700 to-slate-600 rounded-xl p-4 mb-4 grid grid-cols-6 gap-4 text-sm font-semibold text-white shadow-lg">
          <div>Employee</div>
          <div className="text-center">New</div>
          <div className="text-center">Active</div>
          <div className="text-center">Completed</div>
          <div className="text-center">Failed</div>
          <div className="text-center">Actions</div>
        </div>

        <div className="space-y-3" id="allList">
          {userData.map((employee, idx) => (
            <div key={idx} className='glass-effect rounded-xl border border-slate-600 overflow-hidden hover:border-slate-500 transition-all duration-200 shadow-lg hover:shadow-xl'>
              {/* Employee Summary Row */}
              <div className='p-4 grid grid-cols-6 gap-4 items-center bg-slate-800/30'>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {employee.firstname.charAt(0)}
                  </div>
                  <div>
                    <div className='font-semibold text-white'>{employee.firstname}</div>
                    <div className='text-xs text-slate-400'>{employee.id}</div>
                  </div>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-500/20 text-blue-400 rounded-lg font-bold">
                    {employee.taskNumber?.newTask || 0}
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-500/20 text-amber-400 rounded-lg font-bold">
                    {employee.taskNumber?.active || 0}
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-lg font-bold">
                    {employee.taskNumber?.completed || 0}
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-red-500/20 text-red-400 rounded-lg font-bold">
                    {employee.taskNumber?.failed || 0}
                  </span>
                </div>
                <div className='text-center'>
                  <button
                    onClick={() => toggleEmployeeExpansion(employee.id)}
                    className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {expandedEmployee === employee.id ? 'Hide' : 'View'} Tasks
                  </button>
                </div>
              </div>

              {/* Expanded Task Details */}
              {expandedEmployee === employee.id && employee.tasks && employee.tasks.length > 0 && (
                <div className="bg-slate-800/50 p-6 border-t border-slate-600 animate-fade-in">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>Tasks for {employee.firstname}</span>
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {employee.tasks.map((task, taskIdx) => (
                      <div key={taskIdx} className="glass-effect rounded-xl p-4 border border-slate-600 hover:border-slate-500 transition-all duration-200 group hover:scale-[1.02] shadow-lg hover:shadow-xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className={`text-xs px-3 py-1 rounded-full font-semibold text-white bg-gradient-to-r ${getStatusColor(task)} shadow-lg`}>
                            {getStatusText(task)}
                          </span>
                          <span className="text-xs text-slate-400 font-medium">{task.date}</span>
                        </div>
                        <h5 className="font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{task.title}</h5>
                        <p className="text-sm text-slate-300 mb-3 leading-relaxed">{task.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-slate-400 bg-slate-700 px-2 py-1 rounded-full font-medium">{task.category}</span>
                          {(task.completed || task.failed) && (
                            <button
                              onClick={() => confirmDeleteTask(employee, task)}
                              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                              title="Delete Task"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl p-6 max-w-md w-full border border-slate-600 shadow-2xl animate-fade-in">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Confirm Task Deletion</h3>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Are you sure you want to delete the task <span className="font-semibold text-white">"{showDeleteConfirm.task.title}"</span> 
              from <span className="font-semibold text-white">{showDeleteConfirm.employee.firstname}</span>?
              <br />
              <span className="text-red-400 text-sm font-medium">This action cannot be undone.</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleDeleteTask(showDeleteConfirm.employee.id, showDeleteConfirm.task)}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Delete Task
              </button>
              <button
                onClick={cancelDeleteTask}
                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
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