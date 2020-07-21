import React from "react";
import { Route, BrowserRouter as Router,Switch, Redirect } from "react-router-dom";
import NotFound from '../containers/NotFound';
import Signup from "../containers/SignupInstructor";
import SignupStudent from '../containers/SignupStudent';
import Dashboard from "../containers/Dashboard";
import Assignments from "../containers/Assignments";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={["/","/signup"]} component={Signup}>
          <Redirect to="/signup/instructor" />
        </Route>
          <Route exact path={"/signup/instructor"} component={Signup}></Route>
          <Route exact path={"/signup/student"} component={SignupStudent}></Route>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/courses" component={Assignments} />
          <Route exact path="/courses/:courseId/assignments" component={Assignments} />
          <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;