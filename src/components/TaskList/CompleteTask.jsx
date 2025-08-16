import React from "react";

const CompleteTask = ({data}) => {
  return (
    <div className="flex-shrink-0 h-full w-[300px] bg-orange-400 rounded-xl p-5">
      <div className="flex items-center justify-between">
        <h3 className="px-3 py-1 text-sm rounded bg-red-600">
          {data.category}
        </h3>
        <h4 className="text-sm">{data.date}</h4>
      </div>
      <h2 className="mt-3 text-2xl font-semibold">{data.title}</h2>
      <p className="text-sm mt-2 ">{data.description}</p>
      <div className="mt-6">
        <button className="w-full bg-green-500 py-1 px-2 text-sm rounded cursor-pointer font-semibold">
          Completed
        </button>
      </div>
    </div>
  );
};

export default CompleteTask;
