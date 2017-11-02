import React from "react";
import { connect } from "react-redux";

import Portfolio from "../Components/Portfolio";

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Portfolio {...this.props} />;
  }
}

const mapStateToProps = state => {
  console.log("redux store = ");
  console.log(state);
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
