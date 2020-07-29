import React, { useState } from "react";
import { Table } from "react-bootstrap";
import "../assets/styles/components/table.scss";
import DropDown from "./DropDown";
import { connect } from 'react-redux';

const TableComponent  = (props) => {
  const { tableRows } = props;
  const [dropDownState, setDropDownState] = useState(false);

  const handleClick = (target) => {
    if (target.id === "dropdown") {
      setDropDownState(!dropDownState);
    }
  };
  return (
    <div className="table">
      <Table responsive hover>
        <thead>
          <tr>
            <th>name</th>
            <th>ID</th>
            <th>start date</th>
            <th>end date</th>
            <th>members</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          { tableRows.length ? 
          tableRows.map((tableRow) => {
            return (
              <tr>
                <td>{tableRow.sectionName}</td>
                <td>{tableRow.sectionId}</td>
                <td>{tableRow.startingDate}</td>
                <td>{tableRow.closingDate}</td>
                <td>{tableRow.members}</td>
                <td>
                  <DropDown handleClick={handleClick} rowId={tableRow.sectionName} />
                </td>
              </tr>
            );
          }) : <p>No data found</p>
          }
        </tbody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    section: state.courses.section,
  };
};

export default connect(mapStateToProps, )(TableComponent);
