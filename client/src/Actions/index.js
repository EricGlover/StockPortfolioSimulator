import { purchaseTransaction, sellTransaction } from "./Transactions";
import { spendCash, getCash } from "./User";
import { acquireStock, releaseStock } from "./Portfolio";

//because of my redundant data and data spread across multiple reducers
//I added these handy dandy functions to dispatch
//all the various redux actions

//Purchase a stock
export const buyStock = (date, price, quantity, ticker) => async dispatch => {
  dispatch(purchaseTransaction(date, price, quantity, ticker));
  dispatch(acquireStock(price, quantity, ticker));
  dispatch(spendCash(price * quantity));
};

//Sell a stock
export const sellStock = (date, price, quantity, ticker) => async dispatch => {
  dispatch(sellTransaction(date, price, quantity, ticker));
  dispatch(releaseStock(price, quantity, ticker));
  dispatch(getCash(price * quantity));
};
