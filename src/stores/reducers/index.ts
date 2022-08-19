import { combineReducers } from "redux";
import { AuthInterface } from "../model/auth-interface";
import { authReducers } from "./user-reducer";

import { SchoolInterface } from "../model/school-interface";
import { schoolReducers } from "./school-reducer";
export interface StoreState {
  authUser: AuthInterface;
  schools : SchoolInterface[];
}
export const reducers = combineReducers<StoreState>({
  authUser: authReducers,
  schools: schoolReducers
});
