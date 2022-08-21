import { SchoolInterface } from "../model/school-interface";
import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import { Dispatch } from "redux";
import { School } from "../model/school";
import { AxiosRequestConfig } from "axios";
import { getItem } from "../../auth/LocalStorage";

const authUser = JSON.parse(getItem("authUser") || "null");
if (authUser && authUser.userInfo) {
  var token = authUser.userInfo.data.token;
}

let option: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2MTAxODkwOH0.rnJaR_Zy2TroVkFkciK8YSFweZhqwsX4jAxcZtXVEKs`,
  },
};

let optionImage: AxiosRequestConfig = {
  headers: {
    "Content-Type": "multipart/form-data",
    'Accept': "application/json",
    'type': "formData",
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2MTAxODkwOH0.rnJaR_Zy2TroVkFkciK8YSFweZhqwsX4jAxcZtXVEKs`,
  },
};

export interface getSchoolsAction {
  type: ActionTypes.getSchools | ActionTypes.getError;
  payload: School | any;
}

export const getAllSchools = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.get<School>("school", option);
      dispatch<getSchoolsAction>({
        type: ActionTypes.getSchools,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
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

export interface createSchoolAction {
  type: ActionTypes.createSchool | ActionTypes.getError;
  payload: School | any;
}

export const postSchool = (school : SchoolInterface) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.post<School>(
        'school', school, optionImage
      );

      dispatch<createSchoolAction>({
        type: ActionTypes.createSchool,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<createSchoolAction>({
          type: ActionTypes.getError,
          payload: err.message,
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
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.put<School>(
        "school/" + id,
        school,
        option
      );
      dispatch<editSchoolAction>({
        type: ActionTypes.editSchool,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<editSchoolAction>({
          type: ActionTypes.getError,
          payload: err.message,
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
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.delete<School>("school/" + id, option);
      dispatch<deleteSchoolAction>({
        type: ActionTypes.deleteSchool,
        payload: response,
      });
    } catch (err) {
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
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.post<School>(
        'assigned-school', emails, option
      );

      dispatch<inviteManagerAction>({
        type: ActionTypes.inviteManager,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<inviteManagerAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

