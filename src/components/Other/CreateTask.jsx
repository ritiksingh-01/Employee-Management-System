import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { getLocalStorage } from "../../utils/localStorage";

const CreateTask = () => {
  const [userData, setUserData, adminData, setAdminData] = useContext(AuthContext);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [asignTo, setAsignTo] = useState('');
  const [category, setCategory] = useState('');

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

    alert('Task created successfully!');
  };

  return (
    <div className="p-5 bg-[#1C1C1C] mt-7 rounded">
      <form onSubmit={submitHandler} className="flex flex-wrap w-full items-start justify-between form-container">
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-300">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm rounded px-2 py-1 w-4/5 outline-none bg-transparent border-[1px] border-gray-400 text-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 placeholder-gray-500"
              type="text"
              placeholder="Make a UI Design"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-300">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm rounded px-2 py-1 w-4/5 outline-none bg-transparent border-[1px] border-gray-400 text-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
              type="date"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-300">Assign To</h3>
            <select
              value={asignTo}
              onChange={(e) => setAsignTo(e.target.value)}
              className="text-sm rounded px-2 py-1 w-4/5 outline-none bg-transparent border-[1px] border-gray-400 text-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
              required
            >
              <option value="" className="bg-[#1C1C1C] text-gray-300">Select Employee</option>
              {userData && userData.map((emp, idx) => (
                <option key={idx} value={emp.firstname} className="bg-[#1C1C1C] text-gray-300 hover:bg-gray-700">
                  {emp.firstname}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-300">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm rounded px-2 py-1 w-4/5 outline-none bg-transparent border-[1px] border-gray-400 text-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 placeholder-gray-500"
              type="text"
              placeholder="Design, DEV, etc"
              required
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col item-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            name=""
            id=""
            cols="30"
            rows="10"
            className="w-full h-44 text-sm py-2 px-2 bg-transparent rounded outline-none border-[1px] border-gray-400 text-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 placeholder-gray-500 resize-none"
            placeholder="Task description and requirements.."
            required
          ></textarea>
          <button
            type="submit"
            className="w-full bg-emerald-500 px-5 py-3 hover:bg-emerald-600 active:bg-emerald-700 text-sm mt-4 rounded cursor-pointer transition-all duration-200 font-medium text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;