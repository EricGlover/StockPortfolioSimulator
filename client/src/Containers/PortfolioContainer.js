import React from "react";
import { connect } from "react-redux";

import Portfolio from "../Components/Portfolio";

class PortfolioContainer extends React.Component {
  constructor(props) {
    super(props);
    this.mainTableColumns = [
      "Symbol",
      "Quantity",
      "Cost Basis",
      "Current Value",
      "Profit/Loss",
      "Current Price",
      "1d",
      "7d",
      "30d"
    ];
  }
  handleSortSelection = (e, column) => {
    return null;
  };
  render() {
    const { portfolio } = this.props;
    let stocks = Object.keys(portfolio).map(ticker => {
      let stock = portfolio[ticker];
      return {
        ticker,
        quantity: stock.quantity,
        costBasis: stock.costBasis,
        currentValue:
          this.props.currentDaysStocks[ticker].close * stock.quantity,
        profit:
          this.props.currentDaysStocks[ticker].close * stock.quantity -
          stock.costBasis,
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
        onSortSelection={this.handleSortSelection}
        mainTableColumns={this.mainTableColumns}
      />
    );
  }
}

const mapStateToProps = state => {
  console.log("redux store = ");
  console.log(state);
  return {
    cash: state.user.cash,
    portfolio: state.portfolio
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioContainer);
