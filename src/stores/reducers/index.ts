import { combineReducers } from "redux";
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
import { peopleReducers } from "./people-reducer";
export interface StoreState {
  authUser: any;
  signedUpUser:any;
  schools : SchoolInterface;
  schoolList : School[],
  classList : Class[],
  classes : ClassInterface;
  eventList : Event[],
  events : EventInterface;
  menuState: MenuDataInterFace;
  users : any;
}
export const reducers = combineReducers<StoreState>({
  signedUpUser: authReducers,
  authUser: authReducers,
  // users : authReducers,
  schools: schoolReducers,
  schoolList: schoolReducers,
  classes: classReducers,
  classList: classReducers,
  events : eventReducers,
  eventList : eventReducers,
  menuState: MenuReducers,
  users : peopleReducers,
});
