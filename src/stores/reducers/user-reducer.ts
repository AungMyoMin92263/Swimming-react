import { Action, ActionTypes } from '../actions/types';
import { AuthInterface } from '../model/auth-interface';

export const authReducers = (
  state: AuthInterface = {
    isSignedIn: null,
    userInfo: null,
    error: null,
    token: null,
    otherUserinfo: null
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.signIn:
      const user = action.payload as IUser
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
        result: action.payload,
        error: null,
      };
      case ActionTypes.editUser:
        return {
          result: action.payload,
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
    default:
      return state;
  }
};


