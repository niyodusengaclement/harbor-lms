import React from "react";
import WelcomeMessage from "../components/Welcome";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { countClicks } from "../redux/actions";

const Home = (props) => {
  const handleClick = () => {
    props.countClicks();
  };
  return (
    <div>
      <WelcomeMessage />
      <Button onClick={handleClick}>Click me</Button>
      redux global state:{JSON.stringify(props.globalState)}
    </div>
  );
};

const mapStateToProps = ({ btnClicks }) => {
  return {
    globalState: btnClicks,
  };
};
const mapDispatchToProps = {
  countClicks,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
