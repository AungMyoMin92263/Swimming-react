import { combineReducers } from "redux";
import { AuthInterface } from "../model/auth-interface";
import { authReducers } from "./user-reducer";
export interface StoreState {
  authUser: AuthInterface
}
export const reducers = combineReducers<StoreState>({
  authUser: authReducers
});
