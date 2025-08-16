import React from "react";
import Header from "../Header/Header";
import CreateTask from "../Other/CreateTask";
import AllTask from "../Other/AllTask";

const AdminDashboard = (props) => {
  return (
    <div className="p-10 h-screen w-full">
      <Header  changeUser = {props.changeUser}  />
      <CreateTask />
      <AllTask/>
    </div>
  );
};

export default AdminDashboard;