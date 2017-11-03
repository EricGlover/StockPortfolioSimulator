import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
//REACT-REDUX
import { Provider } from "react-redux";
import store from "./Store/store";

import DateSlider from "./Components/Elements/slider";
import StockContainer from "./Containers/StockContainer";
import TradeContainer from "./Containers/TradeContainer";
import TransactionsContainer from "./Containers/TransactionsContainer";
import PortfolioContainer from "./Containers/PortfolioContainer";

import moment from "moment";
import logo from "./public/logo.png";
import "./public/stylesheets/App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  constructor() {
    super();
    this.defaults = {
      startingDate: moment(`2016-01-01`)
    };
    this.state = {
      loaded: false,
      stockData: undefined,
      currentDate: moment("2016-01-01"),
      currentStock: undefined,
      user: {
        cash: 1000
      },
      redirect: false,
      redirectTo: undefined
    };
  }

  componentDidMount = async () => {
    let h = new Headers();
    let serverResponse = await fetch("/api/prices", {
      headers: h,
      method: "GET"
    });
    const stockData = await serverResponse.json();
    const firstDaysPrices = stockData[Object.keys(stockData)[0]];
    const currentStock = Object.keys(firstDaysPrices)[0];
    this.setState({ stockData, currentStock, loaded: true });
  };
  pricePicker = () => {
    const { stockData, currentDate, currentStock } = this.state;
    // console.log(stockData, currentDate, currentStock);
    return stockData[currentDate.valueOf()][currentStock].close;
  };
  handleDateChange = newDate => {
    this.setState({ currentDate: moment(newDate) });
  };
  handleSelectStock = e => {
    //get the button
    //also I have to query the DOM here, worth?? at least I don't have to curry...
    //.closest isn't supported in IE so....sorry IE
    let btn = e.target.closest("button");
    this.setState((prevState, props) => {
      return { currentStock: btn.getAttribute("data-stock-ticker") };
    });
    this.handleRedirect(null, null, "Trade");
  };
  handleSelectStockAlt = ticker => {
    this.setState((prevState, props) => {
      return { currentStock: ticker };
    });
    this.handleRedirect(null, null, "Trade");
  };
  handleRedirect = (e, key, payload) => {
    console.log("handling redirect");
    console.log(payload);
    this.setState({ redirect: true, redirectTo: payload });
  };

  render() {
    if (this.state.redirect) {
      this.setState({ redirect: false, redirectTo: undefined });
      return (
        <Router>
          <Redirect push={true} to={`/${this.state.redirectTo}`} />
        </Router>
      );
    }
    let currentDaysStocks = this.state.stockData
      ? this.state.stockData[this.state.currentDate.valueOf()]
      : null;
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <Router>
            <div className="App">
              <nav className="navbar">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="nav-title">Stock Portofolio Simulator</h1>
              </nav>
              <main className="content-container">
                {/********* LEFT PANEL  *********  */}
                <StockContainer
                  stocks={currentDaysStocks}
                  onTrade={this.handleSelectStock}
                />
                {/********* RIGHT PANEL *********  */}
                <div className="main-view-container">
                  <DateSlider
                    date={this.state.currentDate}
                    startingDate={this.defaults.startingDate}
                    onDateChange={this.handleDateChange}
                  />
                  {/*********ROUTING*********  */}
                  <Switch>
                    <Route
                      path="/trade"
                      render={() => {
                        return this.state.loaded ? (
                          <TradeContainer
                            onRedirect={this.handleRedirect}
                            currentDate={this.state.currentDate}
                            price={this.pricePicker()}
                            onChangeQuantity={this.handleQuantityChange}
                            currentStock={this.state.currentStock}
                          />
                        ) : null;
                      }}
                    />
                    <Route
                      path="/transactions"
                      render={() => {
                        return this.state.loaded ? (
                          <TransactionsContainer
                            onRedirect={this.handleRedirect}
                          />
                        ) : null;
                      }}
                    />
                    <Route
                      path="/portfolio"
                      render={() => {
                        return this.state.loaded ? (
                          <PortfolioContainer
                            currentDaysStocks={currentDaysStocks}
                            onRedirect={this.handleRedirect}
                            currentDate={this.state.currentDate}
                            onTrade={this.handleSelectStockAlt}
                          />
                        ) : null;
                      }}
                    />
                    <Route
                      path="/"
                      component={() => <Redirect push to="/portfolio" />}
                    />
                  </Switch>
                </div>
              </main>
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
