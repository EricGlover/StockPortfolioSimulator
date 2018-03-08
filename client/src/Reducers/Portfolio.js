import { ACQUIRE_STOCK, RELEASE_STOCK } from "../Actions/Portfolio";
import { decimalFloor } from "../util/math";

export const portfolio = (state = {}, action) => {
  let ticker;
  let quantity;
  let cost;
  let prevQuantity;
  let prevCostBasis;
  switch (action.type) {
    case ACQUIRE_STOCK:
      ticker = action.data.ticker;
      quantity = action.data.quantity;
      cost = action.data.cost;
      prevQuantity = state[ticker] ? state[ticker].quantity : 0;
      prevCostBasis = state[ticker] ? state[ticker].costBasis : 0;
      return {
        ...state,
        [ticker]: {
          quantity: prevQuantity + quantity,
          costBasis: decimalFloor(prevCostBasis + cost)
        }
      };
    case RELEASE_STOCK:
      ticker = action.data.ticker;
      quantity = action.data.quantity;
      cost = action.data.cost;
      prevQuantity = state[ticker] ? state[ticker].quantity : 0;
      prevCostBasis = state[ticker] ? state[ticker].costBasis : 0;
      return {
        ...state,
        [ticker]: {
          quantity: prevQuantity - quantity,
          costBasis: decimalFloor(prevCostBasis + cost)
        }
      };
    default:
      return state;
  }
};
