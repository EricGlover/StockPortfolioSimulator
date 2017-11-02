import {
  PURCHASE_TRANSACTION,
  SELL_TRANSACTION
} from "../Actions/Transactions";

export const transactions = (state = [], action) => {
  let arr;
  switch (action.type) {
    case PURCHASE_TRANSACTION:
      //make a new arr out of state
      arr = state.map(obj => {
        return Object.assign({}, obj);
      });
      arr.push(action.data);
      return arr;
    case SELL_TRANSACTION:
      //make a new arr out of state
      arr = state.map(obj => {
        return Object.assign({}, obj);
      });
      arr.push(action.data);
      return arr;
    default:
      return state;
  }
};
