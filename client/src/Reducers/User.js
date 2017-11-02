import { SPEND_CASH, GET_CASH } from "../Actions/User";
import { decimalFloor } from "../util/math";
export const user = (state = {}, action) => {
  switch (action.type) {
    case SPEND_CASH:
      return {
        ...state,
        cash: decimalFloor(state.cash - action.data)
      };
    case GET_CASH:
      return {
        ...state,
        cash: decimalFloor(state.cash + action.data)
      };
    default:
      return state;
  }
};
