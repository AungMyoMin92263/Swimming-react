import { SignInInterface } from '../model/auth-interface';
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
        'users/login', signInInfo
      );
      dispatch<SignInAction>({
        type: ActionTypes.signIn,
        payload: response
      });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        dispatch<SignInAction>({
          type: ActionTypes.getError,
          payload: err.message
        });
      } else {
        console.log('Unexpected error', err);
      }
      
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
