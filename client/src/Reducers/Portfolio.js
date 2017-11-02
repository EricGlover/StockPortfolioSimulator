import { ACQUIRE_STOCK, RELEASE_STOCK } from "../Actions/Portfolio";

export const portfolio = (state = {}, action) => {
  switch (action.type) {
    case ACQUIRE_STOCK:
    case RELEASE_STOCK:
      const { ticker, quantity, cost } = action.data;
      return {
        ...state,
        [ticker]: {
          quantity: state[ticker].quantity + quantity,
          costBasis: state[ticker].costBasis + cost
        }
      };
    default:
      return state;
  }
};
