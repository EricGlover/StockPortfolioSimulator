import { ACQUIRE_STOCK, RELEASE_STOCK } from "../Actions/Portfolio";

export const portfolio = (state = {}, action) => {
  switch (action.type) {
    case ACQUIRE_STOCK:
    case RELEASE_STOCK:
      const { ticker, quantity, cost } = action.data;
      const prevQuantity = state[ticker] ? state[ticker].quantity : 0;
      const prevCostBasis = state[ticker] ? state[ticker].costBasis : 0;
      return {
        ...state,
        [ticker]: {
          quantity: prevQuantity + quantity,
          costBasis: prevCostBasis + cost
        }
      };
    default:
      return state;
  }
};
