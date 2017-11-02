import React from "react";
import { connect } from "react-redux";
import { buyStock, sellStock } from "../Actions/index";

import TradeScreen from "../Components/TradeScreen";

import Snackbar from "material-ui/Snackbar";

class TradeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buy: true,
      quantity: 1,
      cost: 1 * props.price,
      notification: {
        message: undefined,
        open: false
      }
    };
  }
  isValidTrade = () => {
    const { buy, quantity, cost } = this.state;
    if (this.state.buy) {
      if (this.props.user.cash > cost) return true;
    } else {
      const ticker = this.props.currentStock;
      //if the stock isn't in the portfolio you can't sell it
      if (!this.props.portfolio[ticker]) return false;
      const availableStocks = this.props.portfolio[ticker].quantity;
      if (quantity <= availableStocks) return true;
    }
    return false;
  };
  //blur on enter for the filter
  handleKeyUp = e => {
    if (e.key === "Enter") e.target.blur();
  };
  handleTogglePurchase = e => {
    this.setState({
      buy: !this.state.buy
    });
  };
  handleQuantityChange = (e, value) => {
    this.setState({
      quantity: value,
      cost: value * this.props.price
    });
  };
  handleTransaction = e => {
    const { currentDate, currentStock, price } = this.props;
    if (!this.isValidTrade()) {
      //display error
      return null;
    }
    if (this.state.buy) {
      this.props.buyStock(
        currentDate,
        price,
        this.state.quantity,
        currentStock
      );
    } else {
      this.props.sellStock(
        currentDate,
        price,
        this.state.quantity,
        currentStock
      );
    }
    this.setState({
      notification: {
        message: `You ${this.state.buy ? "bought" : "sold"} ${this.state
          .quantity} ${this.state.quantity > 1 ? "shares" : "share"} of ${this
          .props.currentStock}`,
        open: true
      }
    });
  };
  handleNotificationRequestClose = () => {
    this.setState({
      notification: {
        open: false
      }
    });
  };
  render() {
    return (
      <div>
        <TradeScreen
          {...this.props}
          onKeyUp={this.handleKeyUp}
          onChangeQuantity={this.handleQuantityChange}
          onTogglePurchase={this.handleTogglePurchase}
          onPurchase={this.handleTransaction}
          onSale={this.handleTransaction}
          valid={this.isValidTrade()}
          buy={this.state.buy}
          quantity={this.state.quantity}
          cost={this.state.cost}
        />
        <Snackbar
          open={this.state.notification.open}
          message={this.state.notification.message}
          autoHideDuration={4000}
          onRequestClose={this.handleNotificationRequestClose}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    portfolio: state.portfolio
  };
};
const mapDispatchToProps = dispatch => {
  return {
    buyStock: (date, price, quantity, ticker) => {
      dispatch(buyStock(date, price, quantity, ticker));
    },
    sellStock: (date, price, quantity, ticker) => {
      dispatch(sellStock(date, price, quantity, ticker));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradeContainer);
