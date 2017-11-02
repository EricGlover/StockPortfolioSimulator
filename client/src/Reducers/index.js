import { user } from "./User";
import { transactions } from "./Transactions";
import { portfolio } from "./Portfolio";
import { combineReducers } from "redux";

const rootReducer = combineReducers({ user, transactions, portfolio });

export default rootReducer;
