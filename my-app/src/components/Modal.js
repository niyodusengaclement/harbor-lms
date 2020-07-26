import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import InputField from "./InputField";
import Btn from "./Btn";
import "../assets/styles/components/modal.scss";

export default (props) => {
  const [lgShow, setLgShow] = useState(false);

  return (
    <div>
      <Button onClick={() => setLgShow(true)}>New Section</Button>
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        className="modal"
      >
        <Modal.Header closeButton className="modal--header">
          <Modal.Title className="modal--header--title">
            Create a section
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal--body">
          <h6>
            Section name <span className="required">*</span> :
          </h6>
          <InputField
            type="text"
            id="sectionName"
            placeholder="example: course 1"
            onChange=""
            className="input__large"
          />
            <InputField
              type="radio"
              name="schoolSystem"
              className="modal--body--radio"
              radioInputs={[
                { name: "trimester", value: "trimester", label: "trimester" },
                { name: "semester", value: "semester", label: "semester" },
              ]}
              onChange=""
            />
          <h6>
            Select term/semester <span className="required">*</span> :
          </h6>
          <InputField
            type="select"
            name="calendarSystem"
            id="calendarSystem"
            className="input__medium"
            selectOptions={[
              { value: "semester 1", label: "1" },
              { value: "semester 2", label: "2" },
            ]}
          />
          <h6>Starting date</h6>
          <InputField type="date" className="input__medium"></InputField>
          <h6>Finishing date</h6>
          <InputField type="date" className="input__medium"></InputField>
        </Modal.Body>
        <Modal.Footer className="modal--footer">
          <Btn name="save" label="save section" handleClick="" />
        </Modal.Footer>
      </Modal>
    </div>
  );
};
