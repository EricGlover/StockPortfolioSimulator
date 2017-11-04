import React, { Component } from "react";
import moment from "moment";

import Paper from "material-ui/Paper";
import Slider from "material-ui/Slider";

//TODO: consider refactoring the slider to Unix epoch instead of ints
//TODO: REVISIT PERFOMANCE CONCERNS

class DateSlider extends Component {
  constructor(props) {
    super(props);
    console.log("constructing DateSlider");
    console.log(props);
    this.state = {
      startingDate: props.startingDate,
      date: moment(props.currentDate),
      defaultValue: moment(props.currentDate).dayOfYear() - 1,
      max: props.endingDate.dayOfYear() - 1
    };
    console.log(this.state);
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
    console.log(`slider ${value}, `);
    let newDate = moment(this.state.startingDate).add(value, "days");
    this.props.onDateChange(newDate);
  };

  render = () => {
    if (!this.props.loaded) return null;
    return (
      <div>
        <div className="date-display">
          <p id="starting-date">{this.props.startingDate.format("MMM-D-YY")}</p>
          <p id="current-date">{this.props.currentDate.format("MMM-D-YY")}</p>
          <p id="ending-date">{this.props.endingDate.format("MMM-D-YY")}</p>
        </div>
        <Slider
          defaultValue={this.state.defaultValue}
          onChange={this.onChange}
          min={0}
          max={this.state.max}
          step={1}
        />
      </div>
    );
  };
}

export default DateSlider;
