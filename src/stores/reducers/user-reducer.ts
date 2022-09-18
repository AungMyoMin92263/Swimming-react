import { setItem, setItemWithObject } from '../../auth/LocalStorage';
import { Action, ActionTypes } from '../actions/types';
import { AuthInterface } from '../model/auth-interface';

export const authReducers = (
  state: AuthInterface = {
    isSignedIn: null,
    userInfo: null,
    error: null,
    token: null,
    otherUserinfo: null,
    viewStudent: null
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.signIn:
      const user = action.payload as IUser
      setItem("userToken", user?.token || "")
      setItemWithObject("authUser", {
        ...state,
        isSignedIn: true,
        userInfo: user,
        token: user.token
      });
      return {
        ...state,
        isSignedIn: true,
        userInfo: user,
        token: user.token
      };
    case ActionTypes.signUp:
      return {
        ...state,
        isSignedUp: true,
      }
    case ActionTypes.changePwd:
      return {
        ...state,
        isSignedUp: true,
      }
    case ActionTypes.recoverPwd:
      const recoverUser = action.payload as IUser
      return {
        ...state,
        userInfo: recoverUser,
      }
    case ActionTypes.signOut:
      return {
        ...state,
        isSignedIn: false,
        userInfo: null,
        error: null,
        token: null
      };

    case ActionTypes.getUsers:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.editUser:
      return {
        ...state,
        userInfo: action.payload,
        error: null,
      };
    case ActionTypes.getError:
      return {
        ...state,
        isSignedIn: false,
        error: action.payload,
      };

    case ActionTypes.getOtherUserInfo:
      return {
        ...state,
        error: null,
        otherUserinfo: action.payload
      };
    case ActionTypes.setStudentView:
      return {
        ...state,
        error: null,
        viewStudent: action.payload
      };
      case ActionTypes.deleteUser:
        return {
          ...state,
        result: action.payload,
        error: null,
        };

    default:
      return state;
  }
};


