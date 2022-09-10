import { SignUpAction, SignInAction, SignOutAction, RecoverPasswordAction, ChangePasswordAction } from "./auth-action";
import { getSchoolsAction,createSchoolAction,editSchoolAction,deleteSchoolAction,inviteManagerAction, getSchoolObjAction} from './school-action';
import { SelectedMenuAction } from './menu-action';
import { createClassAction, deleteClassAction, editClassAction, getClassAction,getClassObjAction, inviteCoachAction, inviteStudentAction } from "./class-action";
import { getEventAction , createEventAction , editEventAction ,deleteEventAction , inviteEventAction} from "./event-action";
import { getUsersAction } from "./people-action";

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

  getUsers,
}

export type Action = SignUpAction
  |SignInAction
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
