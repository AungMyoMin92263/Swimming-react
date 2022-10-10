import { SchoolInterface } from "../model/school-interface";
import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import { Dispatch } from "redux";
import { School } from "../model/school";
import { AxiosRequestConfig } from "axios";
import { getItem } from "../../auth/LocalStorage";

var option: AxiosRequestConfig;
var optionImage: AxiosRequestConfig;

export const refreshToken = (token=null) => {
  if (token===null) {const authUser = JSON.parse(getItem("authUser") || "null");
  if (authUser && authUser.userInfo) {
  token = authUser.userInfo.token;}
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
  return async (dispatch: Dispatch) => {}
}


export interface getSchoolsAction {
  type: ActionTypes.getSchools | ActionTypes.getError;
  payload: School | School[] | any;
}

export const getAllSchools = () => {
  refreshToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<School>("schools", option);
      console.log('response', response.data)
      dispatch<getSchoolsAction>({
        type: ActionTypes.getSchools,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err : any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<getSchoolsAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface getSchoolObjAction {
  type: ActionTypes.getSchoolObj | ActionTypes.getError;
  payload: School | any;
}

export const getSchoolObj =  (url : string) => {
  refreshToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<School>(url, option);
      dispatch<getSchoolObjAction>({
        type: ActionTypes.getSchoolObj,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<getSchoolObjAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface createSchoolAction {
  type: ActionTypes.createSchool | ActionTypes.getError;
  payload: School | any;
}

export const postSchool = (school : SchoolInterface) => {
  refreshToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.post<School>(
        'schools', school, optionImage
      );

      dispatch<createSchoolAction>({
        type: ActionTypes.createSchool,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err:any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        
        dispatch<createSchoolAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface editSchoolAction {
  type: ActionTypes.editSchool | ActionTypes.getError;
  payload: School | any;
}

export const putSchool = (school: SchoolInterface, id: number) => {
  refreshToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.put<School>(
        "schools/" + id,
        school,
        option
      );
      dispatch<editSchoolAction>({
        type: ActionTypes.editSchool,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err :any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        console.log(err)
        dispatch<editSchoolAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface deleteSchoolAction {
  type: ActionTypes.deleteSchool | ActionTypes.getError;
  payload: School | any;
}

export const deleteSchoolObj = (id: number) => {
  refreshToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.delete<School>("schools/" + id, option);
      dispatch<deleteSchoolAction>({
        type: ActionTypes.deleteSchool,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<deleteSchoolAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface inviteManagerAction {
  type: ActionTypes.inviteManager | ActionTypes.getError;
  payload: any;
}

export const inviteManager = (emails : any) => {
  refreshToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.post<School>(
        'assigned/school', emails, option
      );

      dispatch<inviteManagerAction>({
        type: ActionTypes.inviteManager,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      console.log("Error", err.response)
      if (err) {
        dispatch<inviteManagerAction>({
          type: ActionTypes.getError,
          payload: err.response.status === 400 ||  err.response.status === 500? err.response.data.message: err.response.data.message[0]
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};


export interface deleteManagerAction {
  type: ActionTypes.deleteManager | ActionTypes.getError;
  payload: any;
}

export const deleteManager = (url: string, id: number) => {
  refreshToken();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.delete<any>(url + "/" + id, option);
      dispatch<deleteManagerAction>({
        type: ActionTypes.deleteManager,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<deleteManagerAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};
