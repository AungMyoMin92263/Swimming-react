import { SignUpAction, SignInAction, SignOutAction, RecoverPasswordAction, ChangePasswordAction, GetUsersAction, editUserAction } from "./auth-action";
import { getSchoolsAction,createSchoolAction,editSchoolAction,deleteSchoolAction,inviteManagerAction, getSchoolObjAction} from './school-action';
import { SelectedMenuAction } from './menu-action';
import { createClassAction, deleteClassAction, editClassAction, getClassAction, getClassObjAction, inviteCoachAction, inviteStudentAction, getClassByDateAction, getclassesByDateAction, createClassProgramAction, getAssignUserByClassAction } from "./class-action";
import { getEventAction , createEventAction , editEventAction ,deleteEventAction , inviteEventAction} from "./event-action";
import { getAllAction, getUsersAction,LoadingAction } from "./global-action";
import { createCoachAction, deleteCoachAction, editCoachAction, getCoachAction,getCoachObjAction } from "./coach-action";
import { createStudentAction, deleteStudentAction, editStudentAction, getStudentAction,getStudentObjAction } from "./student-action";
import { CommentAction } from "./comment-action";
import { CreateAttendanceAction, GetMyAttendanceAction } from "./attendance-action";

export enum ActionTypes {
  signUp,
  signIn,
  signOut,
  recoverPwd,
  changePwd,
  getError,
  getUserInfo,
  getOtherUserInfo,
  editUser,

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
  getAssignUserByClass,
  getClassObj,
  createClass,
  createClassProgram,
  getClassProgram,
  editClass,
  deleteClass,
  
  // Comment
  getComments,
  postComment,

  //MyAttendance
  getMyAttendance,
  createAttendance,

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


   //student
   getStudent,
   getStudentObj,
   createStudent,
   editStudent,
   deleteStudent,

   //global
   getAll,
   getUsers,
   loading,
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
  | createClassProgramAction
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
  | GetUsersAction
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
  | CommentAction
  | LoadingAction
  | getAssignUserByClassAction
  | GetMyAttendanceAction
  | CreateAttendanceAction
  | editUserAction
