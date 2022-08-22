import { SignInAction, SignOutAction } from "./auth-action";
import { getSchoolsAction,createSchoolAction,editSchoolAction,deleteSchoolAction,inviteManagerAction} from './school-action';
import { SelectedMenuAction } from './menu-action';

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
}

export type Action = SignInAction
  | SignOutAction 
  | getSchoolsAction 
  | createSchoolAction 
  | editSchoolAction 
  | deleteSchoolAction
  | inviteManagerAction
  | SelectedMenuAction
