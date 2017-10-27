import React, { Component } from "react";
import moment from "moment";
import Slider from "material-ui/Slider";

//TODO: consider refactoring the slider to Unix epoch instead of ints
//TODO: REVISIT PERFOMANCE CONCERNS

class DateSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startingDate: `2016-01-01`,
      date: moment(`2016-01-01`)
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
  // convertToDate = int => {
  //   let newDate = moment(this.state.startingDate).add(int, "days");
  //   this.props.onDateChange(newDate);
  // };
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

/* Debounce an utter garbage example */
// class Table extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { searchTerm: props.searchTerm };
//   }
//
//   setSearchTerm = debounce(e => {
//     this.setState({ searchTerm: e.target.value });
//   }, 1000);
//
//   render() {
//     return (
//       <div className="widget">
//         <p>{this.state.searchTerm}</p>
//         <input onChange={this.setSearchTerm} />
//       </div>
//     );
//   }
// }
//
// React.render(
//   <Table searchTerm="Initial search term" />,
//   document.getElementById("container")
// );
//
// function debounce(a, b, c) {
//   var d, e;
//   return function() {
//     function h() {
//       (d = null), c || (e = a.apply(f, g));
//     }
//     var f = this,
//       g = arguments;
//     return (
//       clearTimeout(d), (d = setTimeout(h, b)), c && !d && (e = a.apply(f, g)), e
//     );
//   };
// }
