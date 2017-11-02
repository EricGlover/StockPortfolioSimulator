import React from "react";

import RaisedButton from "material-ui/RaisedButton";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Toggle from "material-ui/Toggle";

import { decimalFloor } from "../util/math";

import "../public/stylesheets/TradeScreen.css";

//TODO: add a set quantity to maximum amount available button

const TradeScreen = ({
  currentStock,
  buy,
  valid,
  currentDate,
  quantity,
  onKeyUp,
  price,
  user,
  onTogglePurchase,
  onChangeQuantity,
  onRedirect,
  onPurchase,
  onSale
}) => {
  return (
    <div>
      <div className="trade-screen-title">
        <h3>Trade</h3>
        <SelectField value={"Trade"} onChange={onRedirect}>
          <MenuItem value={"Trade"} primaryText="Trade" />
          <MenuItem value={"Transactions"} primaryText="Transactions" />
          <MenuItem value={"Portfolio"} primaryText="Portofolio" />
        </SelectField>
      </div>
      <div className="trade-screen-content">
        <div className="trade-screen-content-section">
          <p>Symbol: {currentStock}</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <p>{buy ? "Buy" : "Sell"} </p>
            <Toggle onToggle={onTogglePurchase} toggled={buy} />
          </div>

          <p>Date {currentDate.format("MMM-D-YY")}</p>
          <TextField
            onKeyUp={onKeyUp}
            floatingLabelText="Quantity"
            floatingLabelFixed
            onChange={onChangeQuantity}
            value={quantity}
          />

          <p>Price: ${decimalFloor(price)}</p>
          <p>
            {buy ? "Cost" : "Profit"}: ${decimalFloor(price * quantity)}
          </p>
        </div>
        <div className="trade-screen-content-section">
          <div>
            <p>Cash Available</p>
            <p>${user.cash}</p>
          </div>
          <div>
            <p>Order Status</p>
            <p>{valid ? "Valid" : "Invalid"}</p>
          </div>
        </div>
      </div>
      <RaisedButton
        fullWidth
        primary
        disabled={valid ? false : true}
        onClick={buy ? onPurchase : onSale}
        className="trade-screen-cta"
        label="Place Order!"
      />
    </div>
  );
};

export default TradeScreen;
