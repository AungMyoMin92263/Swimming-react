import { SignInInterface, SignUpInterface } from '../model/auth-interface';
import { ActionTypes } from './types';
import apiServer from '../../api/api-service';
import { Dispatch } from 'redux';
import { refreshHeaderOptionToken } from '../../api/api-header-option';

export interface SignUpAction {
  type: ActionTypes.signUp | ActionTypes.getError;
  payload: IUser | any
}

export const signUp = (signUpInfo: SignUpInterface) => {
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.post<IUser>(
        'users/register-with-token', signUpInfo
      );

      dispatch<SignUpAction>({
        type: ActionTypes.signUp,
        payload: response.data
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err :any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
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

export interface ChangePasswordAction {
  type: ActionTypes.changePwd | ActionTypes.getError;
  payload: IUser | any
}


export const changePwd = (signUpInfo: SignUpInterface) => {
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.put<IUser>(
        'users/password', signUpInfo
      );
      dispatch<ChangePasswordAction>({
        type: ActionTypes.changePwd,
        payload: response.data
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err :any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        // ✅ TypeScript knows err is Error
        dispatch<ChangePasswordAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message
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
      dispatch({ type: ActionTypes.loading, payload: true })
      if (signInInfo.role === "no_role"){
        const response = await apiServer.post<IUser>(
          'users/login/no-role', signInInfo
        );
        dispatch<SignInAction>({
          type: ActionTypes.signIn,
          payload: response.data
        });
        dispatch({ type: ActionTypes.loading, payload: false })
      }else
      {
        const response = await apiServer.post<IUser>(
          'users/login', signInInfo
        );
        dispatch<SignInAction>({
          type: ActionTypes.signIn,
          payload: response.data
        });
      }


      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        console.log("Error message", err.response.data.message)
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

export const setUpdateObj = (userInfo: IUser) => {
  return (dispatch: Dispatch) => {
    dispatch<SignInAction>({
      type: ActionTypes.signIn,
      payload: userInfo
    });
  }

}

export interface RecoverPasswordAction {
  type: ActionTypes.recoverPwd | ActionTypes.getError;
  payload: IUser | any;
}

export const recoverPassword = (password: string) => {
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.post<IUser>(
        'users/forget-password', password
      );
      dispatch<RecoverPasswordAction>({
        type: ActionTypes.recoverPwd,
        payload: response.data
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
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
export interface GetUsersAction {
  type: ActionTypes.getOtherUserInfo | ActionTypes.getUserInfo | ActionTypes.getError;
  payload: any;
}

export const getUserInfo = (id: string, other?: boolean) => {
  return async (dispatch: Dispatch) => {
    let options = refreshHeaderOptionToken()
    const response = await apiServer.get(
      'users/' + id, options.option
    );
    dispatch<GetUsersAction>({
      type: ActionTypes.getOtherUserInfo,
      payload: response.data
    });
  }
}

export interface editUserAction {
  type: ActionTypes.editUser | ActionTypes.getError;
  payload: any;
}

export const putUser = (user: any, url: string, id: number) => {
  let options = refreshHeaderOptionToken();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.put<any>(
        url + '/' + id,
        user,
        options?.optionImage
      );
      dispatch<editUserAction>({
        type: ActionTypes.editUser,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<editUserAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface SetStudentViewAction {
  type: ActionTypes.setStudentView | ActionTypes.getError;
  payload: any;
}

export const setStudentView = (student: any) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch<SetStudentViewAction>({ type: ActionTypes.setStudentView, payload: student })
    }
    catch (err: any) {

    }
  }
}

export interface deleteUserAction {
  type: ActionTypes.deleteUser | ActionTypes.getError;
  payload: any;
}

export const deleteUser = (url : string,id: number) => {

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.delete<any>(url+"/" + id);
      dispatch<deleteUserAction>({
        type: ActionTypes.deleteUser,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<deleteUserAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};