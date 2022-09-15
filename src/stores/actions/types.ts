import { SignUpAction, SignInAction, SignOutAction, RecoverPasswordAction, ChangePasswordAction } from "./auth-action";
import { getSchoolsAction,createSchoolAction,editSchoolAction,deleteSchoolAction,inviteManagerAction, getSchoolObjAction} from './school-action';
import { SelectedMenuAction } from './menu-action';
import { createClassAction, deleteClassAction, editClassAction, getClassAction, getClassObjAction, inviteCoachAction, inviteStudentAction, getClassByDateAction, getclassesByDateAction } from "./class-action";
import { getEventAction , createEventAction , editEventAction ,deleteEventAction , inviteEventAction} from "./event-action";
import { getAllAction, getUsersAction } from "./global-action";
import { createCoachAction, createCommentAction, deleteCoachAction, editCoachAction, getCoachAction,getCoachObjAction } from "./coach-action";
import { createStudentAction, deleteStudentAction, editStudentAction, getStudentAction,getStudentObjAction } from "./student-action";

export enum ActionTypes {
  signUp,
  signIn,
  signOut,
  recoverPwd,
  changePwd,
  getError,

  getSchools,
  getSchoolObj,
  createSchool,
  editSchool,
  deleteSchool,

  inviteManager,
  selectedMenu,

  getClass,
  getclassesByDate,
  getclassesByDateRange,
  getClassObj,
  createClass,
  editClass,
  deleteClass,

  inviteStudent,
  inviteCoach,

  getEvent,
  createEvent,
  editEvent,
  deleteEvent,

  inviteEvent,

  //coach
  getCoach,
  getCoachObj,
  createCoach,
  editCoach,
  deleteCoach,

  postComment,

   //student
   getStudent,
   getStudentObj,
   createStudent,
   editStudent,
   deleteStudent,

   //global
   getAll,
   getUsers,
}

export type Action = SignUpAction
  | SignInAction
  | SignOutAction 
  | RecoverPasswordAction
  | ChangePasswordAction
  | getSchoolsAction 
  | getSchoolObjAction
  | createSchoolAction 
  | editSchoolAction 
  | deleteSchoolAction
  | inviteManagerAction
  | SelectedMenuAction
  | getClassAction 
  | getClassObjAction
  | createClassAction 
  | editClassAction 
  | deleteClassAction
  | inviteStudentAction
  | inviteCoachAction
  | getEventAction 
  | createEventAction 
  | editEventAction 
  | deleteEventAction
  | inviteEventAction
  | getUsersAction 
  | getCoachAction 
  | getCoachObjAction
  | createCoachAction 
  | editCoachAction 
  | deleteCoachAction
  | getStudentAction 
  | getStudentObjAction
  | createStudentAction 
  | editStudentAction 
  | deleteStudentAction
  | getClassByDateAction 
  | getAllAction
  | getclassesByDateAction
  | createCommentAction
