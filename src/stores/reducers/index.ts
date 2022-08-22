import { combineReducers } from "redux";
import { AuthInterface } from "../model/auth-interface";
import { authReducers } from "./user-reducer";
import { School } from '../model/school';
import { SchoolInterface } from "../model/school-interface";
import { schoolReducers } from "./school-reducer";
import { MenuDataInterFace } from "../model/menu.interface";
import { MenuReducers } from "./menuReducers";
export interface StoreState {
  authUser: AuthInterface;
  schools : SchoolInterface;
  schoolList : School[],
  menuState: MenuDataInterFace;

}
export const reducers = combineReducers<StoreState>({
  authUser: authReducers,
  schools: schoolReducers,
  schoolList: schoolReducers,
  menuState: MenuReducers

});
