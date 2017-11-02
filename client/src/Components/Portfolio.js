import React from "react";

import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";

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
    </div>
  );
};

export default Portfolio;
