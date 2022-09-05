import { SignInInterface, SignUpInterface } from '../model/auth-interface';
import { ActionTypes } from './types';
import apiServer from '../../api/api-service';
import { Dispatch } from 'redux';

export interface SignUpAction{
  type:ActionTypes.signUp | ActionTypes.getError;
  payload: IUser | any
}

export const signUp = (signUpInfo: SignUpInterface) => {
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      const response = await apiServer.post<IUser>(
        'users/register-with-token', signUpInfo
      );
      dispatch<SignUpAction>({
        type: ActionTypes.signUp,
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
export interface ChangePasswordAction {
  type: ActionTypes.changePwd | ActionTypes.getError;
  payload: IUser | any
}


export const changePwd = (signUpInfo: SignUpInterface) => {
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      const response = await apiServer.put<IUser>(
        'users/password', signUpInfo
      );
      dispatch<ChangePasswordAction>({
        type: ActionTypes.changePwd,
        payload: response
      });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        dispatch<ChangePasswordAction>({
          type: ActionTypes.getError,
          payload: err.message
        });
      } else {
        console.log('Unexpected error', err);
      }

    }


  };
}


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
    } catch (err: any) {
      if (err) {
        console.log("Error message",err.response.data.message)
        // ✅ TypeScript knows err is Error
        dispatch<SignInAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message
        });
      } else {
        console.log('Unexpected error', err);
      }
      
    }
    

  };
}

export interface RecoverPasswordAction{
  type: ActionTypes.recoverPwd | ActionTypes.getError;
  payload: IUser | any;
}

export const recoverPassword = (password:string) =>{
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      const response = await apiServer.post<IUser>(
        'users/forget-password', password
      );
      dispatch<RecoverPasswordAction>({
        type: ActionTypes.recoverPwd,
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
