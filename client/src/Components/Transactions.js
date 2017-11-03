import React from "react";
import PropTypes from "prop-types";

//material-ui
import SelectField from "material-ui/SelectField";
import Paper from "material-ui/Paper";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderColumn,
  TableRowColumn,
  TableBody
} from "material-ui/Table";
import SortButton from "./Elements/SortButton";

//styles
import "../public/stylesheets/Transactions.css";

const Transactions = props => {
  const {
    onRedirect,
    onFilterChange,
    filter,
    onKeyUp,
    columns,
    transactions
  } = props;
  return (
    <Paper>
      <Paper className="transactions-screen-title">
        <h3>Transactions</h3>
        <TextField
          onChange={onFilterChange}
          value={filter}
          onKeyUp={onKeyUp}
          hintText={"Filter"}
        />
        <SelectField value={"Transactions"} onChange={onRedirect}>
          <MenuItem value={"Trade"} primaryText="Trade" />
          <MenuItem value={"Transactions"} primaryText="Transactions" />
          <MenuItem value={"Portfolio"} primaryText="Portofolio" />
        </SelectField>
      </Paper>
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            {columns.map(title => {
              return (
                <TableHeaderColumn
                  style={{ paddingLeft: "0px", paddingRight: "0px" }}
                  key={title}
                >
                  <SortButton
                    label={title}
                    ascending={props.sortAscending}
                    icon={props.sortBy === title ? true : false}
                    style={{ fontSize: "12px" }}
                    labelStyle={{ fontSize: "12px" }}
                    onClick={e => {
                      props.onSortSelection(e, title);
                    }}
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
          {transactions.map(transaction => {
            return (
              <TableRow key={transactions.ticker}>
                <TableRowColumn>
                  {transaction.date.format("MMM-D-YY")}
                </TableRowColumn>
                <TableRowColumn>{transaction.ticker}</TableRowColumn>
                <TableRowColumn>{transaction.type}</TableRowColumn>
                <TableRowColumn>{transaction.quantity}</TableRowColumn>
                <TableRowColumn>{`$${transaction.price}`}</TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};
Transactions.propTypes = {
  columns: PropTypes.array.isRequired,
  transactions: PropTypes.array.isRequired,
  onSortSelection: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.string,
  onKeyUp: PropTypes.func.isRequired
};
export default Transactions;

//
//
// // An array of a certain type
// optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
//
// // An object with property values of a certain type
// optionalObjectOf: PropTypes.objectOf(PropTypes.number),
//
// // An object taking on a particular shape
// optionalObjectWithShape: PropTypes.shape({
//   color: PropTypes.string,
//   fontSize: PropTypes.number
// }),
