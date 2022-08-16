import { APIResInterface, AuthInterface, SignInInterface } from '../model/auth-interface';
import { ActionTypes } from './types';
import apiServer from '../../api/api-service';
import { Dispatch } from 'redux';
export interface SignInAction {
  type: ActionTypes.signIn | ActionTypes.getError;
  payload: IUser | any;
}

export const signIn = (signInInfo: SignInInterface) => {
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      const response = await apiServer.post<IUser>(
        'user/login', signInInfo
      );
      dispatch<SignInAction>({
        type: ActionTypes.signIn,
        payload: response
      });
    } catch (error) {
      dispatch<SignInAction>({
        type: ActionTypes.signIn,
        payload: error
      });
    }

  };
}

export interface SignOutAction {
  type: ActionTypes.signOut;
}

export const signOut = () => {
  return {
    type: ActionTypes.signOut
  };
};
