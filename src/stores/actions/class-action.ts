import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import { Dispatch } from "redux";
import { Class } from "../model/class";
import { ClassInterface } from "../model/class-interface";
import { AxiosRequestConfig } from "axios";
import { getItem } from "../../auth/LocalStorage";

var token = '';
var option: AxiosRequestConfig;
var optionImage: AxiosRequestConfig;
var url = '';

export const refreshTokenClass = () => {
  const authUser = JSON.parse(getItem("authUser") || "null");
  if (authUser && authUser.userInfo) {
  token = authUser.userInfo.data.token;
  console.log('token',token)

  option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  
  optionImage = {
    headers: {
      "Content-Type": "multipart/form-data",
      'Accept': "application/json",
      'type': "formData",
      Authorization: `Bearer ${token}`,
    },
  };


}
}

export const createURL = () => {
  const school = JSON.parse(getItem("school") || "null");
if (school) {
  url = school.id + '/class';
}
}

export interface getClassAction {
  type: ActionTypes.getClass | ActionTypes.getError;
  payload: Class | Class[] | any;
}

export const getAllclasses =  async () => {
   await refreshTokenClass();
   await createURL();
   console.log('url',url)
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.get<Class>(url, option);
      console.log('response', response.data)
      dispatch<getClassAction>({
        type: ActionTypes.getClass,
        payload: response.data,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<getClassAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface createClassAction {
  type: ActionTypes.createClass | ActionTypes.getError;
  payload: Class | any;
}

export const postClass = (classe : ClassInterface) => {
  refreshTokenClass();
  createURL();

  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.post<Class>(
        url, classe, optionImage
      );

      dispatch<createClassAction>({
        type: ActionTypes.createClass,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<createClassAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface editClassAction {
  type: ActionTypes.editClass | ActionTypes.getError;
  payload: Class | any;
}

export const putClass = (classe: ClassInterface, id: number) => {
  refreshTokenClass();
  createURL();

  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.put<Class>(
        url + id,
        classe,
        option
      );
      dispatch<editClassAction>({
        type: ActionTypes.editClass,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<editClassAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface deleteClassAction {
  type: ActionTypes.deleteClass | ActionTypes.getError;
  payload: Class | any;
}

export const deleteClass = (id: number) => {
  refreshTokenClass();
  createURL();

  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.delete<Class>(url+"/" + id, option);
      dispatch<deleteClassAction>({
        type: ActionTypes.deleteClass,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<deleteClassAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface inviteStudentAction {
  type: ActionTypes.inviteStudent | ActionTypes.getError;
  payload: any;
}

export const inviteStudent = (emails : any) => {
  refreshTokenClass();

  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.post<Class>(
        'assigned/class/student', emails, option
      );

      dispatch<inviteStudentAction>({
        type: ActionTypes.inviteStudent,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<inviteStudentAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface inviteCoachAction {
  type: ActionTypes.inviteCoach| ActionTypes.getError;
  payload: any;
}

export const inviteCoach = (emails : any) => {
  refreshTokenClass();

  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.post<Class>(
        'assigned/class/coach', emails, option
      );

      dispatch<inviteCoachAction>({
        type: ActionTypes.inviteCoach,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<inviteCoachAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};



