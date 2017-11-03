import React from "react";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableBody
} from "material-ui/Table";
import "../public/stylesheets/Portfolio.css";

const Portfolio = props => {
  const { onRedirect } = props;
  return (
    <div>
      <div className="portfolio-screen-title">
        <h3>Portfolio</h3>
        <SelectField value={"Portfolio"} onChange={onRedirect}>
          <MenuItem value={"Trade"} primaryText="Trade" />
          <MenuItem value={"Transactions"} primaryText="Transactions" />
          <MenuItem value={"Portfolio"} primaryText="Portofolio" />
        </SelectField>
      </div>
      <h2>Your Cash ${props.cash}</h2>
      <div className="portfolio-stats-table">Stats</div>
      <div className="portfolio-main-table">
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {props.mainTableColumns.map(title => {
                return (
                  <TableHeaderColumn key={title}>
                    <FlatButton
                      label={title}
                      labelStyle={{ fontSize: "8px" }}
                      onClick={e => {
                        props.onSortSelection(e, title);
                      }}
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
            {props.stocks.map(stock => {
              return (
                <TableRow key={stock.ticker}>
                  <TableRowColumn>{stock.ticker}</TableRowColumn>
                  <TableRowColumn>{stock.quantity}</TableRowColumn>
                  <TableRowColumn>
                    {stock.costBasis >= 0 ? `+` : `-`}
                    {stock.costBasis}
                  </TableRowColumn>
                  <TableRowColumn>{stock.currentValue}</TableRowColumn>
                  <TableRowColumn>{stock.profit}</TableRowColumn>
                  <TableRowColumn>{`$${stock.currentPrice}`}</TableRowColumn>
                  <TableRowColumn>{stock["1d"]}</TableRowColumn>
                  <TableRowColumn>{stock["7d"]}</TableRowColumn>
                  <TableRowColumn>{stock["30d"]}</TableRowColumn>
                  <TableRowColumn>
                    <RaisedButton
                      label="Trade"
                      secondary
                      onClick={() => props.onTrade(stock.ticker)}
                    />
                  </TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Portfolio;
