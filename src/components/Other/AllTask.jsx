import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = () => {
  const [userData , setUserData] = useContext(AuthContext)
  return (
    <div
      className="bg-[#1C1C1C] p-5 mt-5 rounded"
      id="allList"
    >
<div className="bg-red-400 mb-2 py-2 px-4 flex justify-between rounded">
        <h2 className='text-lg font-medium w-1/5 '>Employee Name </h2>
        <h3 className='text-lg font-medium w-1/5 '>New Task</h3>
        <h5 className='text-lg font-medium w-1/5 '>Active Task</h5>
        <h5 className='text-lg font-medium w-1/5 '>Completed</h5>
        <h5 className='text-lg font-medium w-1/5 '>Failed</h5>
      </div>
      <div className="h-[80%] " >
      {userData.map(function(e , idx){
        return <div key={idx} className='border-2 border-emerald-500 mb-2 py-2 px-4 flex justify-between rounded'>
        <h2 className='text-lg font-medium w-1/5'>{e.firstname}</h2>
        <h3 className="text-lg font-medium w-1/5 text-blue-400">{e.taskNumber.newTask}</h3>
        <h5 className='text-lg font-medium w-1/5 text-yellow-400'>{e.taskNumber.active}</h5>
        <h5 className='text-lg font-medium w-1/5 text-green-400'>{e.taskNumber.completed}</h5>
        <h5 className='text-lg font-medium w-1/5 text-red-600'>{e.taskNumber.failed}</h5>
      </div>
      })}
      </div>
    </div>
  );
};

export default AllTask;
