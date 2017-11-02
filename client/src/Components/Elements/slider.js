import React, { Component } from "react";
import moment from "moment";
import Slider from "material-ui/Slider";

//TODO: consider refactoring the slider to Unix epoch instead of ints
//TODO: REVISIT PERFOMANCE CONCERNS

class DateSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingDate: this.props.startingDate,
      date: moment(this.props.startingDate)
    };
    // performance test
    // let counter = 0;
    // let stateChanges = 0;
    // this.onChange = (e, value) => {
    //   counter++;
    //   this.setState({ date: value }, () => {
    //     stateChanges++;
    //     console.log(
    //       `stateChanges = ${stateChanges}, onChange called ${counter} times`
    //     );
    //   });
    // };
  }
  onChange = (e, value) => {
    let newDate = moment(this.state.startingDate).add(value, "days");
    this.props.onDateChange(newDate);
  };

  render = () => {
    return (
      <div>
        <p id="dateDisplay">{this.props.date.format("MMM-D-YY")}</p>
        <Slider
          defaultValue={1}
          onChange={this.onChange}
          min={1}
          max={365}
          step={1}
        />
      </div>
    );
  };
}

export default DateSlider;
