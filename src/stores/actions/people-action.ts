import { ActionTypes } from './types';
import apiServer from '../../api/api-service';
import { Dispatch } from 'redux';

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
