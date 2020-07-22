import React from "react";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  console.log('user: ', user);
  //<Component {...rest} {...props} />
  return (
    <Route {...rest} render={
      props => {
        if (user === "instructor") {
          // return <Component {...rest} {...props} />//<Redirect to="/ins.dashboard" />;
          return <Redirect to={
            {
              pathname: '/ins.dashboard',
              state: {
                from: props.location
              }
            }
          } />
        } else if (user === "student") {
          return <Redirect to="/stu.dashboard" />;
        } else {
          return <Redirect to={
            {
              pathname: '/unauthorized',
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    } />
  )
}

export default ProtectedRoute;
