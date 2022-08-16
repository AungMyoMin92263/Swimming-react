import { Action, ActionTypes } from '../actions/types';
import { AuthInterface } from '../model/auth-interface';

export const authReducers = (
  state: AuthInterface = {
    isSignedIn: null,
    userInfo: null,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.signIn:
      return {
        ...state,
        isSignedIn: true,
        userInfo: action.payload,
      };
    case ActionTypes.signOut:
      return {
        ...state,
        isSignedIn: false,
        userInfo: null,
      };

    default:
      return state;
  }
};
