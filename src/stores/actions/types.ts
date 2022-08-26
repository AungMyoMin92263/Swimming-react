import { SignInAction, SignOutAction } from "./auth-action";
import { getSchoolsAction,createSchoolAction,editSchoolAction,deleteSchoolAction,inviteManagerAction} from './school-action';
import { SelectedMenuAction } from './menu-action';
import { createClassAction, deleteClassAction, editClassAction, getClassAction, inviteCoachAction, inviteStudentAction } from "./class-action";

export enum ActionTypes {
  signIn,
  signOut,
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
  inviteCoach
}

export type Action = SignInAction
  | SignOutAction 
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
