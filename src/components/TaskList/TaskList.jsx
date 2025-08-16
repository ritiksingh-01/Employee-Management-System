import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({ data}) => {
  return (
    <div
      id="tasklist"
      className="h-[50%] overflow-x-auto w-full flex flex-nowrap items-center justify-start gap-5 py-5 mt-10"
    >
        {data.tasks.map((e , idx) => {
            if(e.active){
                return <AcceptTask key={idx} data = {e}/>
            } else if(e.newTask){
                return <NewTask key={idx} data = {e}/>
            } else if(e.failed){
                return <FailedTask key={idx} data = {e}/>
            }else if(e.completed){
                return <CompleteTask key={idx} data = {e}/>
            }
        })}
    </div>
  );
};

export default TaskList;
