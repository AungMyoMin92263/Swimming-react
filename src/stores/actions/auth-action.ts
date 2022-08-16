import { SignInInterface } from '../model/auth-interface';
import { ActionTypes } from './types';
import apiServer from '../../api/api-service';
import { Dispatch } from 'redux';
export interface SignInAction {
  type: ActionTypes.signIn;
  payload: IUser;
}

export const signIn = (signInInfo: SignInInterface) => {
  return async (dispatch: Dispatch) => {
    const response = await apiServer.post<IUser>(
      'user/login', signInInfo
    );
    dispatch<SignInAction>({
      type: ActionTypes.signIn,
      payload: response.data
    });
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
