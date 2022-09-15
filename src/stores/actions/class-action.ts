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

export const refreshTokenClass = () => {
  const authUser = JSON.parse(getItem("authUser") || "null");
  if (authUser && authUser.userInfo) {
  token = authUser.userInfo.data.token;

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
export interface getClassAction {
  type: ActionTypes.getClass | ActionTypes.getError;
  payload: Class | Class[] | any;
}

export const getAllclasses =  (url : string) => {
  refreshTokenClass();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.get<Class>(url, option);
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

export interface getClassByDateAction {
  type: ActionTypes.getclassesByDate | ActionTypes.getError;
  payload: any;
} 

export const getclassesByDate =  (url : string) => {
  refreshTokenClass();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.get<Class>(url, option);
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

export interface getClassObjAction {
  type: ActionTypes.getClassObj | ActionTypes.getError;
  payload: Class | any;
}

export const getClassObject =  (url : string) => {
  refreshTokenClass();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.get<Class>(url, option);
      dispatch<getClassObjAction>({
        type: ActionTypes.getClassObj,
        payload: response.data,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<getClassObjAction>({
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

export const postClass = (classe : ClassInterface,url : string) => {
  refreshTokenClass();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.post<Class>(
        url, classe, optionImage
      );

      dispatch<createClassAction>({
        type: ActionTypes.createClass,
        payload: response,
      });
    } catch (err : any) {
      if (err ) {
        dispatch<createClassAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
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

export const putClass = (classe: ClassInterface, url : string, id: number) => {
  refreshTokenClass();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.put<Class>(
        url + '/' + id,
        classe,
        optionImage
      );
      dispatch<editClassAction>({
        type: ActionTypes.editClass,
        payload: response,
      });
    } catch (err: any) {
      if (err ) {
        console.log(err.response.data.statusCode)
        // if (err.response.data.statusCode === 500 ){
        //   var msg = err.response.data.message
        // }else{
        //   var msg = err.response.data.message[0]
        // }
        dispatch<editClassAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
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

export const deleteClass = (url : string,id: number) => {
  refreshTokenClass();

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
    } catch (err:any) {
      if (err) {
        dispatch<inviteStudentAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message[0],
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
        'assigned/class/coache', emails, option
      );

      dispatch<inviteCoachAction>({
        type: ActionTypes.inviteCoach,
        payload: response,
      });
    } catch (err :any) {
      if (err) {
        dispatch<inviteCoachAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message[0],
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};



export interface getclassesByDateAction {
  type: ActionTypes.getclassesByDateRange | ActionTypes.getError;
  payload: any;
}

export const getclassesByDateRange = (url: string) => {
  refreshTokenClass();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.get<Class>(url, option);
      dispatch<getclassesByDateAction>({
        type: ActionTypes.getclassesByDateRange,
        payload: response.data,
      });
    } catch (err: any) {
      if (err) {
        dispatch<getclassesByDateAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};