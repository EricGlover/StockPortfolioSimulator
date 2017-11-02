import moment from "moment";
import rootReducer from "../Reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";

const intialState = {
  user: {
    username: undefined,
    cash: 1000
  },
  transactions: [
    {
      ticker: "NFLX",
      date: moment(`2016-01-01`),
      type: "BUY",
      price: 109.96,
      quantity: 5,
      cost: 109.96 * 5
    },
    {
      ticker: "NFLX",
      date: moment(`2016-01-01`),
      type: "BUY",
      price: 109.96,
      quantity: 5,
      cost: 109.96 * 5
    },
    {
      ticker: "AAPL",
      date: moment(`2016-01-01`),
      type: "BUY",
      price: 105.35,
      quantity: 5,
      cost: 105.35 * 5
    },
    {
      ticker: "ATVI",
      date: moment(`2016-01-01`),
      type: "BUY",
      price: 37.62,
      quantity: 5,
      cost: 37.62 * 5
    }
  ],
  portfolio: {
    NFLX: {
      quantity: 10,
      costBasis: 109.96 * 10
    },
    AAPL: {
      quantity: 5,
      costBasis: 105.35 * 5
    },
    ATVI: {
      quantity: 5,
      costBasis: 37.62 * 5
    }
  }
};

//NOTE: choosing to store all the transactions
//also storing the aggregate amount spent on a particular stock
//in the portfolio instead of calculating everytime,
//this way the portfolio view doesn't have to access
//the transaction history at all, no aggregating that data on the fly
//just remember to keep the portfolio costBasis up to date
//when you make transactions

const store = createStore(rootReducer, intialState, applyMiddleware(thunk));
export default store;
