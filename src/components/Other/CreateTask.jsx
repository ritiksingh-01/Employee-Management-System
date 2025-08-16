import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData, adminData, setAdminData] = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [asignTo, setAsignTo] = useState('');
  const [category, setCategory] = useState('');
  const [showForm, setShowForm] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!taskTitle || !taskDescription || !taskDate || !asignTo || !category) {
      alert('Please fill in all fields');
      return;
    }
    
    const newTask = {
      title: taskTitle,
      description: taskDescription,
      date: taskDate,
      category: category,
      active: false,
      newTask: true,
      failed: false,
      completed: false
    };
    
    const employeeIndex = userData.findIndex(emp => emp.firstname === asignTo);

    if (employeeIndex === -1) {
      alert('Employee not found. Please enter a valid employee name.');
      return;
    }
    
    const updatedUserData = [...userData];
    updatedUserData[employeeIndex].tasks.push(newTask);
    updatedUserData[employeeIndex].taskNumber.newTask += 1;
    updatedUserData[employeeIndex].taskNumber.active += 1;
    setUserData(updatedUserData);
    localStorage.setItem('employees', JSON.stringify(updatedUserData));

    setTaskTitle('');
    setTaskDate('');
    setTaskDescription('');
    setAsignTo('');
    setCategory('');
    setShowForm(false);

    alert('Task created successfully!');
  };

  const categories = [
    'Development', 'Marketing', 'Design', 'Sales', 'Support', 
    'HR', 'Finance', 'Operations', 'Research', 'Quality Assurance'
  ];

  return (
    <div className="glass-effect rounded-2xl p-6 border border-slate-600 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg'>
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Task Management</h2>
            <p className="text-slate-400 text-sm">Create and assign new tasks</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
        >
          {showForm ? 'Cancel' : 'Create New Task'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submitHandler} className="space-y-6 animate-fade-in">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Task Title</label>
                <input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500"
                  type="text"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Due Date</label>
                <input
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500"
                  type="date"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Assign To</label>
                <select
                  value={asignTo}
                  onChange={(e) => setAsignTo(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500"
                  required
                >
                  <option value="" className="bg-slate-800 text-slate-300">Select Employee</option>
                  {userData && userData.map((emp, idx) => (
                    <option key={idx} value={emp.firstname} className="bg-slate-800 text-white">
                      {emp.firstname} ({emp.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500"
                  required
                >
                  <option value="" className="bg-slate-800 text-slate-300">Select Category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-slate-800 text-white">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-300">Task Description</label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows="8"
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 hover:border-slate-500 resize-none"
                  placeholder="Provide detailed task description and requirements..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateTask;