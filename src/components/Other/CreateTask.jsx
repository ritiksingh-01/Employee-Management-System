import React from "react";

const CreateTask = () => {
  return (
    <div className="p-5  bg-[#1C1C1C] mt-7 rounded">
      <form className="flex flex-wrap w-full items-start justify-between ">
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-300">Task Title</h3>
            <input
              className="text-sm rounded px-2 py-1 w-4/5 outline-none bg-transparent border-[1px] border-gray-400"
              type="text"
              placeholder="Make a UI Design"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-300">Date</h3>
            <input
              className="text-sm rounded px-2 py-1 w-4/5 outline-none bg-transparent border-[1px] border-gray-400"
              type="date"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-300">Assign To</h3>
            <input
              className="text-sm rounded px-2 py-1 w-4/5 outline-none bg-transparent border-[1px] border-gray-400"
              type="text"
              placeholder="Employee Name"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-sm text-gray-300">Category</h3>
            <input
              className="text-sm rounded px-2 py-1 w-4/5 outline-none bg-transparent border-[1px] border-gray-400"
              type="text"
              placeholder="Design , DEV , etc"
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col item-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            className="w-full h-44 text-sm py-2 px-2 bg-transparent rounded outline-none border-[1px] border-gray-400 "
            placeholder="Task description and requirements.."
          ></textarea>
          <button className="w-full bg-emerald-500 px-5 py-3 hover:bg-emerald-600 text-sm mt-4 rounded cursor-pointer">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
