import React from "react";
import "../assets/styles/styles.scss";

const NewAssignment = (props) => {

  const toogleModal = () => {
    const el = document.getElementById('newAssignmentModal');
    const el1 = el.style.display === 'none' ? el.style.display = 'block' : el.style.display = 'none';
  }

  return (
    <>
    <div className="modal" id="newAssignmentModal">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h6 className="modal-title m-title pl-2" id="NewAssignmentLabel">Create a new Assignment</h6>
            <button type="button" className="close" onClick={toogleModal}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <div className="row pl-2 pr-2">
              <div className="col-md-6">
                <form >
                  <div className="form-group">
                    <label htmlFor="courseName">Assignment Name<span className="required"> *</span></label>
                    <input type="text" className="form-control" name="name" placeholder="eg: Datatypes Assignment 1" />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
);
};

export default NewAssignment;
