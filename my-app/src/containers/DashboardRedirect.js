import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {getCharsBeforeIndex} from '../helpers/generateStudentUniqueNumber';

const DashboardRedirect = (props) => {

  const redirectTo = (location) => {
    return <Redirect to={location} />;
  };
  let redirectPath = `/${getCharsBeforeIndex(3)(props.userProfile.role)}.dashboard`
//   if(redirectPath !== '/ins/dashboard' || redirectPath !== '/stu/dashboard') redirectPath = './';
  return (
    <div>
      <h5>Redirecting to dashboard...</h5>
      {redirectTo(redirectPath)}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userProfile: state.firebase.profile,
  };
};
export default connect(mapStateToProps)(DashboardRedirect);
