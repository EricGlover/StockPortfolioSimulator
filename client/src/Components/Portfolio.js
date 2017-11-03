import React from "react";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import Paper from "material-ui/Paper";
import Divider from "material-ui/Divider";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableBody
} from "material-ui/Table";
import SortButton from "./Elements/SortButton";
import { decimalFloor } from "../util/math";
import "../public/stylesheets/Portfolio.css";

const noGrow = {
  flexGrow: 0
};

const Portfolio = props => {
  const { onRedirect } = props;
  return (
    <div className="portfolio-wrapper">
      <Paper className="portfolio-screen-title">
        <h3>Portfolio</h3>
        <SelectField value={"Portfolio"} onChange={onRedirect}>
          <MenuItem value={"Trade"} primaryText="Trade" />
          <MenuItem value={"Transactions"} primaryText="Transactions" />
          <MenuItem value={"Portfolio"} primaryText="Portofolio" />
        </SelectField>
      </Paper>
      <h4 className="no-grow">Your Cash ${props.cash}</h4>
      <Paper className="portfolio-stats-table no-grow">
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {props.statsTableColumns.map(title => {
                return (
                  <TableHeaderColumn
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    key={title}
                  >
                    <SortButton
                      label={title}
                      labelStyle={{ fontSize: "12px" }}
                    />
                  </TableHeaderColumn>
                );
              })}
            </TableRow>
          </TableHeader>
          <TableBody
            showRowHover={true}
            stripedRows={true}
            displayRowCheckbox={false}
          >
            <TableRow>
              <TableRowColumn>
                {decimalFloor(props.stats.costBasis)}
              </TableRowColumn>
              <TableRowColumn>
                {decimalFloor(props.stats.currentValue)}
              </TableRowColumn>
              <TableRowColumn>
                {decimalFloor(props.stats.profit)}
              </TableRowColumn>
              <TableRowColumn>{decimalFloor(props.stats["1d"])}</TableRowColumn>
              <TableRowColumn>{decimalFloor(props.stats["7d"])}</TableRowColumn>
              <TableRowColumn>
                {decimalFloor(props.stats["30d"])}
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Divider className="no-grow" style={noGrow} />
      <Paper className="portfolio-main-table">
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              {props.mainTableColumns.map(title => {
                return (
                  <TableHeaderColumn
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                    key={title}
                  >
                    <SortButton
                      label={title}
                      labelStyle={{ fontSize: "10px" }}
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
                  <TableRowColumn
                    style={{ paddingLeft: "0px", paddingRight: "0px" }}
                  >
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
      </Paper>
    </div>
  );
};

export default Portfolio;
