import { Action, ActionTypes } from '../actions/types';
import { AuthInterface } from '../model/auth-interface';

export const authReducers = (
  state: AuthInterface = {
    isSignedIn: null,
    userInfo: null,
    error: null,
    token: null
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
    case ActionTypes.signOut:
      return {
        ...state,
        isSignedIn: false,
        userInfo: null,
        error: null,
        token: null
      };
    case ActionTypes.getError:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
