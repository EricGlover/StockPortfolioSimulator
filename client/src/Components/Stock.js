import React from "react";
// import { Link } from "react-router-dom";
import TextField from "material-ui/TextField";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableBody
} from "material-ui/Table";
import { StockChange } from "./StockChange";
//styles
import "../public/stylesheets/stock.css";

const style = {
  display: "flex",
  flexDirection: "row"
};
const sortButtonStyle = {
  width: "100%",
  height: "100%"
};

//this awkward UI helper is needed because
//one column is named price but the data key is name 'close'
let checkIcon = (title, sortBy) => {
  if (title === sortBy) {
    return true;
  } else if (title === "Price") {
    if (sortBy === "close") return true;
    return false;
  }
  return false;
};

export const Stock = ({ stocks, ...props }) => {
  let stocksDisplay;

  if (stocks) {
    //changing stock data to [ {'ticker', '1d'.... } ]
    //the table body data
    stocksDisplay = stocks.map(stock => {
      return (
        <TableRow key={stock.ticker} style={{ textAlign: "center" }}>
          <TableRowColumn>{stock.ticker}</TableRowColumn>
          <TableRowColumn>{stock.close}</TableRowColumn>
          <TableRowColumn>
            <StockChange change={stock["1d"]} />
          </TableRowColumn>
          <TableRowColumn>
            <StockChange change={stock["7d"]} />
          </TableRowColumn>
          <TableRowColumn>
            <StockChange change={stock["30d"]} />
          </TableRowColumn>
          <TableRowColumn>
            <RaisedButton
              label="Trade"
              secondary
              data-stock-ticker={stock.ticker}
              onClick={props.onTrade}
            />
          </TableRowColumn>
        </TableRow>
      );
    });
  } else {
    stocksDisplay = <div>Loading</div>;
  }
  // const sortIcon = <i className={`fa fa-arrow-${props.sortByAscending ? 'up' : 'down'}`}
  let sortIcon;
  if (props.sortAscending) {
    sortIcon = <i className="fa fa-arrow-up" />;
  } else {
    sortIcon = <i className="fa fa-arrow-down" />;
  }

  return (
    <div className="stockTable">
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow style={{ width: "100%" }}>
            <TableHeaderColumn colSpan="6">
              <div className="header">
                <h3>Stocks</h3>
                <TextField
                  onChange={props.onFilterChange}
                  value={props.filter}
                  onKeyUp={props.onKeyUp}
                  floatingLabelText={"Filter"}
                />
              </div>
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            {props.columns.map(title => {
              return (
                <TableHeaderColumn key={title}>
                  <FlatButton
                    label={title}
                    style={sortButtonStyle}
                    onClick={e => {
                      props.onSortSelection(e, title);
                    }}
                    icon={checkIcon(title, props.sortBy) ? sortIcon : null}
                  />
                </TableHeaderColumn>
              );
            })}
            <TableHeaderColumn>Trade</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          showRowHover={true}
          stripedRows={true}
          displayRowCheckbox={false}
        >
          {stocksDisplay}
        </TableBody>
      </Table>
    </div>
  );
};
