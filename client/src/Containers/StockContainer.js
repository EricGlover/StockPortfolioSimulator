import React from "react";
import { Stock } from "../Components/Stock";
import moment from "moment";

class StockContainer extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { prices: undefined, currentDate: moment("2017-10-02") };
  }
  componentDidMount = async () => {
    // let h = new Headers();
    // let serverResponse = await fetch("/api/prices", {
    //   headers: h,
    //   method: "GET"
    // });
    // console.log(serverResponse);
    // const prices = await serverResponse.json();
    // console.log(prices);
    // this.setState({ prices });
  };
  render() {
    let stocks;
    if (!this.props.stocks) {
      return <div>Loading...</div>;
    } else {
      stocks = this.props.stocks;
    }
    return <Stock stocks={stocks} />;
  }
}

export default StockContainer;
