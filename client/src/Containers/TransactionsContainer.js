import React from "react";
import { connect } from "react-redux";

import Transactions from "../Components/Transactions";

class TransactionsContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Transactions {...this.props} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(
  TransactionsContainer
);
