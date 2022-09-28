import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import { Dispatch } from "redux";
import { AxiosRequestConfig } from "axios";
import { getItem } from "../../auth/LocalStorage";

var token = '';
var option: AxiosRequestConfig;
var optionImage: AxiosRequestConfig;

export const refreshTokenCoach = () => {
  const authUser = JSON.parse(getItem("authUser") || "null");
  if (authUser && authUser.userInfo) {
    token = authUser.userInfo.token;

    option = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    optionImage = {
      headers: {
        "Content-Type": "multipart/form-data",
        'Accept': "multipart/form-data",
        'type': "formData",
        Authorization: `Bearer ${token}`,
      },
    };
  }
}
export interface getCoachAction {
  type: ActionTypes.getCoach | ActionTypes.getError;
  payload: any;
}

export const getAllCoaches = (url: string) => {
  refreshTokenCoach();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<any>(url, option);
      dispatch<getCoachAction>({
        type: ActionTypes.getCoach,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<getCoachAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface getCoachObjAction {
  type: ActionTypes.getCoachObj | ActionTypes.getError;
  payload: any;
}

export const getCoachObject = (url: string) => {
  refreshTokenCoach();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<any>(url, option);
      dispatch<getCoachObjAction>({
        type: ActionTypes.getCoachObj,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<getCoachObjAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface createCoachAction {
  type: ActionTypes.createCoach | ActionTypes.getError;
  payload: any;
}

export const postCoach = (coach: any, url: string) => {
  refreshTokenCoach();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.post<any>(
        url, coach, optionImage
      );

      dispatch<createCoachAction>({
        type: ActionTypes.createCoach,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<createCoachAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface editCoachAction {
  type: ActionTypes.editCoach | ActionTypes.getError;
  payload: any;
}

export const putCoach = (coach: any, url: string, id: number) => {
  refreshTokenCoach();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.put<any>(
        url + '/' + id,
        coach,
        optionImage
      );
      dispatch<editCoachAction>({
        type: ActionTypes.editCoach,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        console.log(err.response.data.statusCode)
        // if (err.response.data.statusCode === 500 ){
        //   var msg = err.response.data.message
        // }else{
        //   var msg = err.response.data.message[0]
        // }
        dispatch<editCoachAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface deleteCoachAction {
  type: ActionTypes.deleteCoach | ActionTypes.getError;
  payload: any;
}

export const deleteCoach = (url: string, id: number) => {
  refreshTokenCoach();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.delete<any>(url + "/" + id, option);
      dispatch<deleteCoachAction>({
        type: ActionTypes.deleteCoach,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err ) {
        dispatch<deleteCoachAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};






