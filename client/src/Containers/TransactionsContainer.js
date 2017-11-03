import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import moment from "moment";

import Transactions from "../Components/Transactions";

class TransactionsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      sortBy: "Symbol",
      sortAscending: true
    };
    this.columns = ["Date", "Symbol", "Type", "Quantity", "Price"];
  }
  //blur on enter for the filter
  handleKeyUp = e => {
    if (e.key === "Enter") e.target.blur();
  };
  //filter text handler
  handleFilter = e => {
    let trimmed = e.target.value;
    this.setState({ filter: trimmed });
  };
  //sorting click handler
  handleSortSelection = (e, column) => {
    if (this.state.sortBy === column) {
      //change the sort
      this.setState({ sortAscending: !this.state.sortAscending });
    } else {
      //change the sorted Column to the selected one
      this.setState({ sortBy: column, sortAscending: true });
    }
  };
  //filter by type date or ticker
  filter = (transactions, filter) => {
    const rgx = new RegExp(filter.trim().toUpperCase());

    //filter by type
    if (filter === "BUY" || filter === "SELL")
      return transactions.filter(transaction => transaction.type === filter);

    //allow for filtering by date
    if (moment(filter).isValid()) {
      return transactions.filter(
        transaction =>
          transaction.date.isSame(moment(filter)) ||
          transaction.date.isSame(moment(`${filter} 2016`))
      );
    }
    //filter transactions by ticker, if nothing else applies
    return transactions.filter(transaction => rgx.test(transaction.ticker));
  };
  //sort transactions by selected columns
  sort = (transactions, sortBy, sortAscending) => {
    sortBy = sortBy.toLowerCase();
    sortBy = sortBy === "symbol" ? "ticker" : sortBy;
    //default case if something goes horribly wrong
    let compare = (a, b) => a > b;
    if (sortBy === "date") {
      //if sorting by a Moment type use isBefore
      compare = sortAscending
        ? (a, b) => {
            if (b.date.isBefore(a.date)) return -1;
            if (b.date.isSame(a.date)) return 0;
            return 1;
          }
        : (a, b) => {
            if (a.date.isBefore(b.date)) return -1;
            if (a.date.isSame(b.date)) return 0;
            return 1;
          };
    } else if (sortBy === "type" || sortBy === "ticker") {
      //if sorting by a String type use localeCompare
      compare = sortAscending
        ? (a, b) => a[sortBy].localeCompare(b[sortBy])
        : (a, b) => b[sortBy].localeCompare(a[sortBy]);
    } else if (sortBy === "price" || sortBy === "quantity") {
      //if sorting by a Number type use -
      compare = sortAscending
        ? (a, b) => a[sortBy] - b[sortBy]
        : (a, b) => b[sortBy] - a[sortBy];
    }
    transactions.sort(compare);
    return transactions;
  };

  render() {
    //filter transactions first then apply the sorting
    let transactions;
    if (!this.props.transactions) {
      return <div>Loading...</div>;
    } else {
      transactions = this.filter(this.props.transactions, this.state.filter);
      transactions = this.sort(
        transactions,
        this.state.sortBy,
        this.state.sortAscending
      );
    }

    return (
      <Transactions
        {...this.props}
        onFilterChange={this.handleFilter}
        onSortSelection={this.handleSortSelection}
        transactions={transactions || []}
        onKeyUp={this.handleKeyUp}
        columns={this.columns}
        {...this.state}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    transactions: state.transactions
  };
};
const mapDispatchToProps = dispatch => {
  return {};
};

TransactionsContainer.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(
  TransactionsContainer
);
