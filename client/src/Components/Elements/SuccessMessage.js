import React from "react";
import PropTypes from "prop-types";
import Snackbar from "material-ui/Snackbar";

class SuccessMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  componentWillReceiveProps = nextProps => {
    if (nextProps.show != this.props.show) {
      this.setState({ open: nextProps.show });
    }
  };
  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  handleRequestClose = () => {
    this.setState({
      open: false
    });
  };
  render() {
    <Snackbar
      open={this.state.open}
      message={this.props.message}
      autoHideDuration={4000}
      onRequestClose={this.handleRequestClose}
    />;
  }
}

SuccessMessage.propTypes = {
  message: PropTypes.String,
  show: PropTypes.Boolean.isRequired
};

export default SuccessMessage;
