import { combineReducers } from "redux";
import { AuthInterface } from "../model/auth-interface";
import { authReducers } from "./user-reducer";
import { School } from '../model/school';
import { SchoolInterface } from "../model/school-interface";
import { schoolReducers } from "./school-reducer";
import { MenuDataInterFace } from "../model/menu.interface";
import { MenuReducers } from "./menuReducers";
import { Class } from '../model/class';
import { ClassInterface } from "../model/class-interface";
import { classReducers } from "./class-reducers";
import { EventInterface } from "../model/event-interface";
import { eventReducers } from "./event-reducers";

export interface StoreState {
  authUser: AuthInterface;
  signedUpUser:any;
  schools : SchoolInterface;
  schoolList : School[],
  classList : Class[],
  classes : ClassInterface;
  eventList : Event[],
  events : EventInterface;
  menuState: MenuDataInterFace;
}
export const reducers = combineReducers<StoreState>({
  signedUpUser: authReducers,
  authUser: authReducers,
  schools: schoolReducers,
  schoolList: schoolReducers,
  classes: classReducers,
  classList: classReducers,
  events : eventReducers,
  eventList : eventReducers,
  menuState: MenuReducers,
});
