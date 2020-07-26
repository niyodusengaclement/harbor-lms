import React from "react";
import SpecificCourse from "../components/SpecificCourse";
import Table from "../components/Table";
import '../assets/styles/containers/courseSection.scss';
import Modal from '../components/Modal';

const CourseSection = () => {
  const addAssignment = () => {
    const el = document.getElementById("newAssignmentModal");
    const el1 =
      el.style.display === "block"
        ? (el.style.display = "none")
        : (el.style.display = "block");
  };
  const buttons = [
    {
      name: "new section",
      clickHandler: addAssignment,
    },
  ];

  return (
    <SpecificCourse
      page=" javascript foundamentals > settings"
      buttons={buttons}
      submenu="Settings"
    >
      <div className='section--body'>
        <h6>COURSE SECTIONS</h6>
        <p>
          A course should be able to have a section for differentiating a
          different intakes of students in the same course (course offering)
        </p>
        <Table />
      </div>
      <Modal/>
    </SpecificCourse>
  );
};
export default CourseSection;
