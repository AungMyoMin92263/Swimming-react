import { SignInAction, SignOutAction } from "./auth-action";
import { getSchoolsAction,createSchoolAction,editSchoolAction,deleteSchoolAction} from './school-action';

export enum ActionTypes {
  signIn,
  signOut,
  getError,

  getSchools,
  createSchool,
  editSchool,
  deleteSchool
}

export type Action = SignInAction
  | SignOutAction 
  | getSchoolsAction 
  | createSchoolAction 
  | editSchoolAction 
  | deleteSchoolAction
