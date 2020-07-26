import React from "react";
import { Route, BrowserRouter as Router,Switch, Redirect } from "react-router-dom";
import NotFound from '../containers/NotFound';
import SignupInstructor from "../containers/SignupInstructor";
import SignupStudent from '../containers/SignupStudent';
import Dashboard from "../containers/Dashboard";
import Assignments from "../containers/Assignments";
import Login from '../containers/Login';
import CourseSection from '../containers/CourseSection';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={["/","/signup"]} component={SignupInstructor}>
          <Redirect to="/signup/instructor" />
          </Route>
          <Route exact path={"/signup/instructor"} component={SignupInstructor}></Route>
          <Route exact path={"/signup/student"} component={SignupStudent}></Route>
          <Route exact path={"/login"} component={Login}></Route>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/courses" component={Assignments} />
          <Route exact path="/courses/:courseId/assignments" component={Assignments} />
          <Route exact path="/courses/sections" component={CourseSection} />
          <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;