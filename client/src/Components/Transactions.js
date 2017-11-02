import React from "react";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

import "../public/stylesheets/Transactions.css";

const Transactions = props => {
  const { onRedirect } = props;
  return (
    <div>
      <div className="transactions-screen-title">
        <h3>Transactions</h3>
        <SelectField value={"Transactions"} onChange={onRedirect}>
          <MenuItem value={"Trade"} primaryText="Trade" />
          <MenuItem value={"Transactions"} primaryText="Transactions" />
          <MenuItem value={"Portfolio"} primaryText="Portofolio" />
        </SelectField>
      </div>
    </div>
  );
};

export default Transactions;
