import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const studentDashboard = (props) => {
 

  return (
    <div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log("stateeeee", state);
  return {
    userProfile: state.firebase.profile,
  };
};
export default connect(mapStateToProps)(studentDashboard);
