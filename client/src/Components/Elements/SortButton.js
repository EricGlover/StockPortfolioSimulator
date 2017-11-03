import React from "react";
import FlatButton from "material-ui/FlatButton";
import { TableHeaderColumn } from "material-ui/Table";
const sortButtonStyle = {
  // minWidth: "none"
  // width: "100%",
  // height: "100%"
  // textAlign: "left",
  // paddingLeft: "0px",
  // paddingRight: "0px"
};
const defaultLabelStyle = {
  fontSize: "10px",
  // paddingLeft: "0px",
  // paddingRight: "0px",
  textTransform: "none"
};
const iconStyle = {
  // paddingLeft: "1.3rem"
};

/*
a button that plays nice with
material-ui table header columns
*/
/* expects these props
label
ascending
icon
*/
const SortButton = props => {
  //merge any styles passed
  const style = { ...sortButtonStyle, ...props.style };
  const labelStyle = { ...defaultLabelStyle, ...props.labelStyle };
  //set the sort icon
  let icon;
  if (props.icon) {
    if (props.ascending) {
      icon = <i style={iconStyle} className="fa fa-caret-up" />;
    } else if (props.ascending === false || props.descending) {
      icon = <i style={iconStyle} className="fa fa-caret-down" />;
    }
  }
  return (
    <FlatButton
      labelPosition="before"
      {...props}
      icon={null} //don't feed FlatButton our icon prop
      ascending={null}
      labelStyle={labelStyle}
      style={style}
    >
      {props.icon ? icon : null}
      {props.children}
    </FlatButton>
  );
};

export default SortButton;
