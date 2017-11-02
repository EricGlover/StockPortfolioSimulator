import React from "react";

export const StockChange = ({ change, ...props }) => {
  let icon;
  let style;
  if (change > 0) {
    style = "stock-price-raised";
    icon = "fa fa-chevron-up";
  } else if (change === 0) {
    // icon = <i className="fa fa-chevron-up" />;
    style = "stock-price-no-change";
  } else {
    icon = "fa fa-chevron-down";
    style = "stock-price-lowered";
  }
  return (
    <div className={style}>
      {change}
      {""}
      <i className={`${icon} stock-price-icon icon ${style}`} />
    </div>
  );
};
