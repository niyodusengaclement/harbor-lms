import React,{useState} from "react";
import { Table,DropdownButton,Dropdown } from "react-bootstrap";
import "../assets/styles/components/table.scss";
import DropDown from './DropDown';

export default (props) => {

  const [dropDownState,setDropDownState] = useState(false);

  const handleClick = (target) => {
    if(target.id === 'dropdown'){
      setDropDownState(!dropDownState);
    }
  }
  return (
    <div className="table">
      <Table responsive hover>
        <thead>
          <tr>
            <th>name</th>
            <th>ID</th>
            <th>start date</th>
            <th>finish date</th>
            <th>members</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          <tr>
            <td>Course 1</td>
            <td>T32122</td>
            <td>20/04/2020</td>
            <td>20/08/2020</td>
            <td>20</td>
            <td>
              <DropDown handleClick={handleClick} />
            </td>
          </tr>
          
        </tbody>
      </Table>
    </div>
  );
};
