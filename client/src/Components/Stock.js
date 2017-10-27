import React from "react";
import TextField from "material-ui/TextField";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableBody
} from "material-ui/Table";
//styles
import "../public/stylesheets/stock.css";

export const Stock = ({ stocks }) => {
  let stocksDisplay;
  if (stocks) {
    stocksDisplay = Object.entries(stocks).map(entry => {
      return (
        <TableRow key={entry[0]}>
          <TableRowColumn>{entry[0]}</TableRowColumn>
          <TableRowColumn>{entry[1].close}</TableRowColumn>
          <TableRowColumn>{entry[1]["1d"]}</TableRowColumn>
          <TableRowColumn>{entry[1]["7d"]}</TableRowColumn>
          <TableRowColumn>{entry[1]["30d"]}</TableRowColumn>
          <TableRowColumn>Trade</TableRowColumn>
        </TableRow>
      );
    });
  } else {
    stocksDisplay = <div>Loading</div>;
  }

  return (
    <div className="stockTable">
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow style={{ width: "100%" }}>
            <TableHeaderColumn colSpan="6">
              <div className="header">
                <h3>Stocks</h3>
                <TextField floatingLabelText={"Filter"} />
              </div>
            </TableHeaderColumn>
          </TableRow>
          <TableRow>
            <TableHeaderColumn>Symbol</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
            <TableHeaderColumn>1d</TableHeaderColumn>
            <TableHeaderColumn>7d</TableHeaderColumn>
            <TableHeaderColumn>30d</TableHeaderColumn>
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
