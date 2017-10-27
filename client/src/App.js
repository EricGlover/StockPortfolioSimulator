import React, { Component } from "react";
import DateSlider from "./Components/Elements/slider";
import moment from "moment";
import logo from "./logo.svg";
import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import StockContainer from "./Containers/StockContainer";

// const centerChildren = {
//   display: 'flex',
//   flexDirection: 'row'
// }

class App extends Component {
  //TODO: revisit lifting up the date later
  constructor() {
    super();
    this.state = {
      prices: undefined,
      currentDate: moment("2016-01-01")
    };
  }
  onDateChange = newDate => {
    this.setState({ currentDate: moment(newDate) });
  };
  componentDidMount = async () => {
    let h = new Headers();
    let serverResponse = await fetch("/api/prices", {
      headers: h,
      method: "GET"
    });
    // console.log(serverResponse);
    const prices = await serverResponse.json();
    // console.log(prices);
    this.setState({ prices });
  };
  render() {
    let currentDaysStocks = this.state.prices
      ? this.state.prices[this.state.currentDate.valueOf()]
      : null;
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Stock Portfolio Simulator</h1>
          </header>
          <p className="App-intro">IT'S THE BEES KNEES!</p>
          <StockContainer stocks={currentDaysStocks} />
          <DateSlider
            date={this.state.currentDate}
            onDateChange={this.onDateChange}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
