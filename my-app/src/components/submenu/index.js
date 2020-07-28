import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/card.scss";
import { instructor } from "./submenus";

const Submenu = ({ page }) => {
  const role = "instructor";
  return (
    <>
      <div className="col-md-2">
        <div className="card p-4 ">
          {role === "instructor"
            ? instructor.map(({ name, url }, idx) => (
                <p
                  key={idx}
                  className={page === name ? "submenu isActive" : "submenu"}
                >
                  <Link
                    to={`/courses/${localStorage.getItem("courseId")}${url}`}
                  >
                    {name}
                  </Link>
                </p>
              ))
            : null}
        </div>
      </div>
    </>
  );
};

export default Submenu;
