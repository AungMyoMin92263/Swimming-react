import { SignUpAction, SignInAction, SignOutAction, RecoverPasswordAction, ChangePasswordAction } from "./auth-action";
import { getSchoolsAction,createSchoolAction,editSchoolAction,deleteSchoolAction,inviteManagerAction} from './school-action';
import { SelectedMenuAction } from './menu-action';
import { createClassAction, deleteClassAction, editClassAction, getClassAction, inviteCoachAction, inviteStudentAction } from "./class-action";
import { getEventAction , createEventAction , editEventAction ,deleteEventAction , inviteEventAction} from "./event-action";

export enum ActionTypes {
  signUp,
  signIn,
  signOut,
  recoverPwd,
  changePwd,
  getError,

  getSchools,
  createSchool,
  editSchool,
  deleteSchool,

  inviteManager,
  selectedMenu,

  getClass,
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
}

export type Action = SignUpAction
  |SignInAction
  | SignOutAction 
  | RecoverPasswordAction
  | ChangePasswordAction
  | getSchoolsAction 
  | createSchoolAction 
  | editSchoolAction 
  | deleteSchoolAction
  | inviteManagerAction
  | SelectedMenuAction
  | getClassAction 
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
