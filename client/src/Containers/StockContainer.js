import React from "react";
import { Stock } from "../Components/Stock";

class StockContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      sortBy: "Symbol",
      sortAscending: false
    };
    this.columns = ["Symbol", "Price", "1d", "7d", "30d"];
  }

  //filter the tickers
  //NOTE: RegExp('').test(anything) === true
  filterStocks(stocks, filter) {
    const rgx = new RegExp(filter.toUpperCase());
    const tickers = Object.keys(stocks).filter(ticker => rgx.test(ticker));
    let filteredStocks = {};
    tickers.forEach(ticker => (filteredStocks[ticker] = stocks[ticker]));
    return filteredStocks;
  }
  //sorting the stocks
  sortStocks(stocks, column, ascending) {
    let sortedKeys = Object.keys(stocks);
    if (column === "Symbol") {
      sortedKeys.sort((a, b) => {
        if (ascending) return a.localeCompare(b);
        return b.localeCompare(a);
      });
    } else {
      sortedKeys.sort((a, b) => {
        if (ascending) return stocks[a][column] - stocks[b][column];
        return stocks[b][column] - stocks[a][column];
      });
    }
    return sortedKeys.map(ticker => {
      return {
        ticker,
        close: stocks[ticker].close,
        "1d": stocks[ticker]["1d"],
        "7d": stocks[ticker]["7d"],
        "30d": stocks[ticker]["30d"]
      };
    });
  }
  //blur on enter for the filter
  handleKeyUp = e => {
    if (e.key === "Enter") e.target.blur();
  };
  handleFilter = e => {
    let trimmed = e.target.value.trim();
    this.setState({ filter: trimmed });
  };
  handleSortSelection = (e, column) => {
    column = column === "Price" ? "close" : column;
    if (this.state.sortBy === column) {
      //change the sort
      this.setState({ sortAscending: !this.state.sortAscending });
    } else {
      //change the sorted Column to the selected one
      this.setState({ sortBy: column, sortAscending: true });
    }
  };
  //filter first then apply the sorting
  render() {
    if (!this.props.loaded) return null;
    let stocks;
    if (!this.props.stocks) {
      return <div>Loading...</div>;
    } else {
      stocks = this.filterStocks(this.props.stocks, this.state.filter);
      stocks = this.sortStocks(
        stocks,
        this.state.sortBy,
        this.state.sortAscending
      );
    }
    return (
      <Stock
        {...this.state}
        {...this.props}
        columns={this.columns}
        onKeyUp={this.handleKeyUp}
        onFilterChange={this.handleFilter}
        onSortSelection={this.handleSortSelection}
        stocks={stocks}
      />
    );
  }
}

export default StockContainer;
