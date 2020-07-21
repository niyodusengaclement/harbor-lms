import React from "react";
import TopHeader from "./TopHeader";
import Submenu from "./submenu/index";
import "../assets/styles/main.scss";

const SpecificCourse = (props) => {
  return (
    <div className="wrapper">
      <TopHeader
				page={` Courses > ${props.page}`}
				buttons={props.buttons}
			/>
      {/* Main panel */}
			<div className="main-panel">
				<div className="content">
					<div className="container-fluid">
						<div className="row">
              <Submenu page={props.page} />
              {props.children}
						</div>
						{/* End of row */}

					</div>
				</div>
			</div>
			{/* END */}
    </div>
  );
};

export default SpecificCourse;