import React from "react";
import TopHeader from "../components/TopHeader";
import Sidebar from "../components/Sidebar/index";

const Courses = () => {
  return (
    <div className="wrapper">
      <TopHeader page='Courses'/>
      <Sidebar />
    </div>
  );
};
export default Courses;