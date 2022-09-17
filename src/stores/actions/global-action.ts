import { ActionTypes } from './types';
import apiServer from '../../api/api-service';
import { Dispatch } from 'redux';
import { Class } from "../model/class";
import { getItem } from '../../auth/LocalStorage';
import { AxiosRequestConfig } from "axios";
import { refreshHeaderOptionToken } from '../../api/api-header-option';

var token = '';
var option: AxiosRequestConfig;
var optionImage: AxiosRequestConfig;



export interface getUsersAction {
  type: ActionTypes.getUsers | ActionTypes.getError;
  payload: any;
}

export const getAllUsers = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<any>("users");
      dispatch<getUsersAction>({
        type: ActionTypes.getUsers,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err : any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<getUsersAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface getAllAction {
  type: ActionTypes.getAll | ActionTypes.getError;
  payload: any;
}

export const getAll = (url : string) => {
  return async (dispatch: Dispatch) => {
    let options = refreshHeaderOptionToken()
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<any>(url,options.option);
      dispatch<getAllAction>({
        type: ActionTypes.getAll,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err : any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<getAllAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface LoadingAction{ 
  type: ActionTypes.loading;
  payload: boolean;
}

export const LoadingActionFunc = (loadingParm: boolean) => {
  return {
      type: ActionTypes.loading,
      payload: loadingParm
  };
};




