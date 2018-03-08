import React from "react";
import TextField from "material-ui/TextField";
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
import SortButton from "./Elements/SortButton";
//styles
import "../public/stylesheets/stock.css";

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
  /*STOCK DISPLAY IS THE TABLE BODY */
  if (stocks) {
    stocksDisplay = stocks.map(stock => {
      return (
        <TableRow key={stock.ticker} style={{ fontSize: "10px" }}>
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
          <TableRowColumn style={{ paddingLeft: "0px", paddingRight: "0px" }}>
            <RaisedButton
              label="Trade"
              secondary
              data-stock-ticker={stock.ticker}
              onClick={() => {
                props.onTrade(stock.ticker);
              }}
            />
          </TableRowColumn>
        </TableRow>
      );
    });
  } else {
    stocksDisplay = <div>Loading</div>;
  }

  /* RENDER THE TABLE */
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
              const thStyle = {
                paddingLeft: "0px",
                paddingRight: "0px"
              };
              return (
                <TableHeaderColumn style={thStyle} key={title}>
                  <SortButton
                    label={title}
                    labelStyle={{ fontSize: "12px" }}
                    ascending={props.sortAscending}
                    icon={checkIcon(title, props.sortBy)}
                    onClick={e => props.onSortSelection(e, title)}
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
