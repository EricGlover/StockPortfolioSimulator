import React from "react";
import { connect } from "react-redux";

import Portfolio from "../Components/Portfolio";

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);
    this.statsTableColumns = [
      "Cost Basis",
      "Current Value",
      "Profit",
      "1d",
      "7d",
      "30d"
    ];
    this.mainTableColumns = [
      "Symbol",
      "Quantity",
      "Cost Basis",
      "Current Value",
      "Profit",
      "Current Price",
      "1d",
      "7d",
      "30d"
    ];
  }
  //TODO: MAKE PORTFOLIO MAIN TABLE SORTABLE
  handleSortSelection = (e, column) => {
    return null;
  };
  render() {
    const { portfolio } = this.props;
    //aggregate the portfolio data into stats
    let stats = {
      costBasis: 0,
      currentValue: 0,
      profit: 0,
      "1d": 0,
      "7d": 0,
      "30d": 0
    };
    //transform the redux data into a friendlier format
    //for displaying in the main portfolio table
    //
    let stocks = Object.keys(portfolio).map(ticker => {
      let stock = portfolio[ticker];
      let currentValue =
        this.props.currentDaysStocks[ticker].close * stock.quantity;
      let profit =
        this.props.currentDaysStocks[ticker].close * stock.quantity -
        stock.costBasis;
      //add to aggregate stats
      stats.costBasis += stock.costBasis;
      stats.currentValue += currentValue;
      stats.profit += profit;
      stats["1d"] += this.props.currentDaysStocks[ticker]["1d"];
      stats["7d"] += this.props.currentDaysStocks[ticker]["7d"];
      stats["30d"] += this.props.currentDaysStocks[ticker]["30d"];

      return {
        ticker,
        quantity: stock.quantity,
        costBasis: stock.costBasis,
        currentValue,
        profit,
        currentPrice: this.props.currentDaysStocks[ticker].close,
        "1d": this.props.currentDaysStocks[ticker]["1d"],
        "7d": this.props.currentDaysStocks[ticker]["7d"],
        "30d": this.props.currentDaysStocks[ticker]["30d"]
      };
    });
    return (
      <Portfolio
        {...this.props}
        stocks={stocks}
        stats={stats}
        statsTableColumns={this.statsTableColumns}
        onSortSelection={this.handleSortSelection}
        mainTableColumns={this.mainTableColumns}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    cash: state.user.cash,
    portfolio: state.portfolio
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
