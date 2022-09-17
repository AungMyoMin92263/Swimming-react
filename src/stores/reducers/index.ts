import { combineReducers } from "redux";
import { authReducers } from "./user-reducer";
import { School } from '../model/school';
import { SchoolInterface } from "../model/school-interface";
import { schoolReducers } from "./school-reducer";
import { MenuDataInterFace } from "../model/menu.interface";
import { MenuReducers } from "./menuReducers";
import { Class } from '../model/class';
import { ClassInterface, ClassRangeInterface } from "../model/class-interface";
import { classReducers } from "./class-reducers";
import { EventInterface } from "../model/event-interface";
import { eventReducers } from "./event-reducers";
import { globalReducers } from "./global-reducers";
import { coachReducers } from "./coach-reducers";
import { studentReducers } from "./student-reducers";
import { CommentInterface } from "../model/comment.interface";
import { commentReducers } from "./comment-reducers";
import { attandanceReducers } from "./attandance-reducers";
export interface StoreState {
  authUser: any;
  signedUpUser: any;
  schools: SchoolInterface;
  schoolList: School[],
  classList: Class[],
  classes: ClassInterface;
  eventList: Event[],
  events: EventInterface;
  menuState: MenuDataInterFace;
  users: any;
  coachList: any[],
  coache: any;
  studentList: any[],
  student: any;
  response: any;
  classListR: ClassRangeInterface
  comments: CommentInterface[],
  loading: any;
  attendance: any;
  user : any;
}
export const reducers = combineReducers<StoreState>({
  signedUpUser: authReducers,
  authUser: authReducers,
  // users : authReducers,
  schools: schoolReducers,
  schoolList: schoolReducers,
  classes: classReducers,
  classList: classReducers,
  events: eventReducers,
  eventList: eventReducers,
  menuState: MenuReducers,
  users: globalReducers,
  response: globalReducers,
  coachList: coachReducers,
  coache: coachReducers,
  studentList: studentReducers,
  student: studentReducers,
  classListR: classReducers,
  comments: commentReducers,
  loading: globalReducers,
  attendance: attandanceReducers,
  user : authReducers,

});
