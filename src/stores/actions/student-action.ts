import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import { Dispatch } from "redux";
import { AxiosRequestConfig } from "axios";
import { getItem } from "../../auth/LocalStorage";

var token = '';
var option: AxiosRequestConfig;
var optionImage: AxiosRequestConfig;

export const refreshTokenStudent = () => {
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
export interface getStudentAction {
  type: ActionTypes.getStudent | ActionTypes.getError;
  payload: any;
}

export const getAllStudents =  (url : string) => {
  refreshTokenStudent();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.get<any>(url, option);
      dispatch<getStudentAction>({
        type: ActionTypes.getStudent,
        payload: response.data,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<getStudentAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface getStudentObjAction {
  type: ActionTypes.getStudentObj | ActionTypes.getError;
  payload: any;
}

export const getStudentObject =  (url : string) => {
  refreshTokenStudent();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.get<any>(url, option);
      dispatch<getStudentObjAction>({
        type: ActionTypes.getStudentObj,
        payload: response.data,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<getStudentObjAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface createStudentAction {
  type: ActionTypes.createStudent | ActionTypes.getError;
  payload: any;
}

export const postStudent = (student : any,url : string) => {
  refreshTokenStudent();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.post<any>(
        url, student, optionImage
      );

      dispatch<createStudentAction>({
        type: ActionTypes.createStudent,
        payload: response,
      });
    } catch (err : any) {
      if (err ) {
        dispatch<createStudentAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface editStudentAction {
  type: ActionTypes.editStudent | ActionTypes.getError;
  payload: any;
}

export const putStudent = (student: any, url : string, id: number) => {
  refreshTokenStudent();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.put<any>(
        url + '/' + id,
        student,
        optionImage
      );
      dispatch<editStudentAction>({
        type: ActionTypes.editStudent,
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
        dispatch<editStudentAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface deleteStudentAction {
  type: ActionTypes.deleteStudent | ActionTypes.getError;
  payload: any;
}

export const deleteStudent = (url : string,id: number) => {
  refreshTokenStudent();

  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.delete<any>(url+"/" + id, option);
      dispatch<deleteStudentAction>({
        type: ActionTypes.deleteStudent,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<deleteStudentAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};



