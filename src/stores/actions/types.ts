import { SignUpAction, SignInAction, SignOutAction, RecoverPasswordAction, ChangePasswordAction, GetUsersAction, editUserAction, SetStudentViewAction,deleteUserAction } from "./auth-action";
import { getSchoolsAction,createSchoolAction,editSchoolAction,deleteSchoolAction,inviteManagerAction, getSchoolObjAction} from './school-action';
import { SelectedMenuAction } from './menu-action';
import { createClassAction, deleteClassAction, editClassAction, getClassAction, getClassObjAction, inviteCoachAction, inviteStudentAction, getClassByDateAction, getclassesByDateAction, createClassProgramAction, getAssignUserByClassAction } from "./class-action";
import { getEventAction , createEventAction , editEventAction ,deleteEventAction , inviteEventAction, EventRecordAction} from "./event-action";
import { getAllAction, getUsersAction,LoadingAction } from "./global-action";
import { createCoachAction, deleteCoachAction, editCoachAction, getCoachAction,getCoachObjAction } from "./coach-action";
import { createStudentAction, deleteStudentAction, editStudentAction, getStudentAction,getStudentObjAction } from "./student-action";
import { CommentAction } from "./comment-action";
import { CreateAttendanceAction, GetMyAttendanceAction } from "./attendance-action";
import { CreateBadgeAction, CreatingBadgeAction, GetMyBadgesAction } from "./badge-action";

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
  setStudentView,
  deleteUser,

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
  getClassDetail,
  createClass,
  createClassProgram,
  getClassProgram,
  editClass,
  deleteClass,
  
  // Comment
  getComments,
  postComment,
  getSendComments,

  //MyAttendance
  getMyAttendance,
  getClassAttendance,
  createAttendance,

  //MyBadge
  getMyBadges,
  createBadges,
  giveBadges,
  getAllBadges,
  selectBadgeIcon,
  selectGiveBadge,

  inviteStudent,
  inviteCoach,

  getEvent,
  createEvent,
  editEvent,
  deleteEvent,
  getDetailEvent,

  getEventsRecordDetail,
  createEventRecord,
  updateEventRecord,
  
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
   getOwnStudent,
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
  | CreateBadgeAction
  | GetMyBadgesAction
  | CreatingBadgeAction
  | editUserAction
  | SetStudentViewAction
  | EventRecordAction
  | deleteUserAction