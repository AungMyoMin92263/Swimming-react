import { ActionTypes } from './types';
import apiServer from '../../api/api-service';
import { Dispatch } from 'redux';
import { Class } from "../model/class";
import { getItem } from '../../auth/LocalStorage';
import { AxiosRequestConfig } from "axios";
import { refreshTokenClass } from './class-action';
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
      const response = await apiServer.get<any>("users");
      dispatch<getUsersAction>({
        type: ActionTypes.getUsers,
        payload: response.data,
      });
    } catch (err : any) {
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
    try {
      const response = await apiServer.get<any>(url);
      dispatch<getAllAction>({
        type: ActionTypes.getAll,
        payload: response.data,
      });
    } catch (err : any) {
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




