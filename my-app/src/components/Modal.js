import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import InputField from "./InputField";
import Btn from "./Btn";
import "../assets/styles/components/modal.scss";
import generateSectionId from "../helpers/generateSectionId";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import {
  createCourseSection,
  updateCourseSection,
} from "../redux/actions/coursesActions";
import { Spinner } from "react-bootstrap";

const ModalComponent = (props) => {
  const { toggled, isDocEdit, isDropdown, } = props;
  const [show, setShow] = useState(props.show);
  const [sectionName, setSectionName] = useState(props.sectionName || "");
  const [calendarSystem, setCalendarSystem] = useState(
    props.calendarSystem || ""
  );
  const [semOrTrim, setSemOrTrim] = useState(props.semOrTrim || "");
  const [startingDate, setStartingDate] = useState(props.startingDate || "");
  const [closingDate, setClosingDate] = useState(props.closingDate || "");
  const [isLoading, setIsLoading] = useState(false);

  const clearFields = () => {
    setSectionName("");
    setCalendarSystem("");
    setSemOrTrim("");
    setStartingDate("");
    setClosingDate("");
  };
  useEffect(() => {

    setShow(toggled);
  }, [props.toggled, props.sections]);
  const handleChange = (target) => {
    if (target.id === "sectionName") setSectionName(target.value);
    else if (target.type === "radio" && target.name === "calendarSystem")
      setCalendarSystem(target.value);
    else if (target.name === "trim/sem") setSemOrTrim(target.value);
    else if (target.name === "startingDate") setStartingDate(target.value);
    else if (target.name === "closingDate") setClosingDate(target.value);
  };
  const handleClick = (target) => {
    if (target.id === "save" || target.name === "save") {
      setIsLoading(true);
      if (
        sectionName &&
        calendarSystem &&
        semOrTrim &&
        startingDate &&
        closingDate
      ) {
        const isInEditMode = props.modalTitle === "Edit section";
        if (isInEditMode) {
          const updatedSection = {
            sectionName,
            calendarSystem,
            semOrTrim,
            startingDate,
            closingDate,
          };
          props.updateCourseSection(
            localStorage.getItem("courseId"),
            props.sectionUid,
            updatedSection,
            setShow,
            setIsLoading
          );
        } else {
          const startingYear = new Date(startingDate).getFullYear();
          const closingYear = new Date(closingDate).getFullYear();
          const sectionId = generateSectionId(
            calendarSystem,
            semOrTrim,
            startingYear,
            closingYear
          );
          const sectionInfo = {
            sectionName,
            calendarSystem,
            semOrTrim,
            startingDate,
            closingDate,
            sectionId,
          };
          sectionInfo.members = 0;
          props.createCourseSection(
            localStorage.getItem("courseId"),
            sectionInfo,
            setShow,
            setIsLoading
          );
        }
      } else {
        toast.error("Please fill in all fields", {
          position: "top-center",
          hideProgressBar: true,
        });
        setIsLoading(false);
      }
    }
  };
  return (
    <div>
      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        className="modal"
      >
        <Spinner
          animation="border"
          variant="primary"
          className={isLoading ? "spinner--position__center" : "hide"}
        />
        <Modal.Header closeButton className="modal--header">
          <Modal.Title className="modal--header--title">
            {props.modalTitle ? "Edit section" : "Create a section"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal--body">
          <h6>
            Section name <span className="required">*</span> :
          </h6>
          <InputField
            type="text"
            id="sectionName"
            value={sectionName}
            placeholder="example: course 1"
            handleChange={handleChange}
            className="input__large"
          />
          <InputField
            type="radio"
            name="calendarSystem"
            className="modal--body--radio"
            radioInputs={[
              {
                name: "calendarSystem",
                value: "trimester",
                label: "trimester",
                checked: `${"trimester" === calendarSystem ? true : ""}`,
              },
              {
                name: "calendarSystem",
                value: "semester",
                label: "semester",
                checked: `${"semester" === calendarSystem ? true : ""}`,
              },
            ]}
            handleChange={handleChange}
          />
          <h6>
            Select term/semester <span className="required">*</span> :
          </h6>
          <InputField
            type="select"
            name="trim/sem"
            value={props.semOrTrim}
            id="trim/sem"
            className="input__large"
            handleChange={handleChange}
            selectOptions={
              calendarSystem === "semester"
                ? [
                    { value: "", label: "select semester" },
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                  ]
                : [
                    { value: "", label: "select trimester" },
                    { value: "1", label: "1" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                  ]
            }
          />
          <div className="modal--body--date">
            <div>
              <h6>Starting date</h6>
              <InputField
                type="date"
                name="startingDate"
                value={startingDate}
                className="input__medium"
                handleChange={handleChange}
              ></InputField>
            </div>
            <div>
              <h6>Closing date</h6>
              <InputField
                type="date"
                name="closingDate"
                value={closingDate}
                className="input__medium"
                handleChange={handleChange}
              ></InputField>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="modal--footer">
          <Btn
            name="save"
            label="save section"
            handleClick={handleClick}
            className="modal--btn"
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sections: state.courses.sections,
    section: state.courses.section,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCourseSection: (courseId, section, setShow, setIsLoading) =>
      dispatch(createCourseSection(courseId, section, setShow, setIsLoading)),
    updateCourseSection: (
      courseId,
      sectionId,
      updates,
      setShow,
      setIsLoading
    ) =>
      dispatch(
        updateCourseSection(courseId, sectionId, updates, setShow, setIsLoading)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent);
