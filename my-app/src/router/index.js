import React from "react";
import { Route, BrowserRouter as Router,Switch, Redirect } from "react-router-dom";
import NotFound from '../containers/NotFound';
import Signup from "../containers/Signup";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={"/"} component={Signup}>
          <Redirect to="/signup" />
          </Route>
          <Route exact path={"/signup"} component={Signup}></Route>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default App;