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
    <div className="rounded-2xl p-6 border border-gray-200 shadow-xl bg-white mt-5 mb-5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Task Management</h2>
            <p className="text-gray-600 text-sm">Create and assign new tasks</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          {showForm ? 'Cancel' : 'Create New Task'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={submitHandler} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Task Title</label>
                <input
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  type="text"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Due Date</label>
                <input
                  value={taskDate}
                  onChange={(e) => setTaskDate(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  type="date"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Assign To</label>
                <select
                  value={asignTo}
                  onChange={(e) => setAsignTo(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                >
                  <option value="" className="bg-gray-50 text-gray-500">Select Employee</option>
                  {userData && userData.map((emp, idx) => (
                    <option key={idx} value={emp.firstname} className="bg-gray-50 text-gray-800">
                      {emp.firstname} ({emp.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-400"
                  required
                >
                  <option value="" className="bg-gray-50 text-gray-500">Select Category</option>
                  {categories.map((cat, idx) => (
                    <option key={idx} value={cat} className="bg-gray-50 text-gray-800">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Task Description</label>
                <textarea
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows="8"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 resize-none"
                  placeholder="Provide detailed task description and requirements..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                >
                  Create Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-xl transition-all duration-200"
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