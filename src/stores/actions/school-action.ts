import { SchoolInterface } from '../model/school-interface';
import { ActionTypes } from './types';
import apiServer from '../../api/api-service';
import { Dispatch } from 'redux';
import { School } from '../model/school';
import { AxiosRequestConfig } from 'axios';


let option : AxiosRequestConfig = {
  // method: 'GET',
  // url: vehiclesUrl,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY2MDk0MTU1M30.f0otlSsfmaCHK2b3W1yp9do3_K-RUvTcOY5elraNRWo',
  },
};

// const config = {
//   headers: { Authorization: `Bearer ${token}` }
// };


export interface getSchoolsAction {
  type: ActionTypes.getSchools | ActionTypes.getError;
  payload: School | any;
}

export const getAllSchools = () => {
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      const response = await apiServer.get<School>(
        'school',option
      );
      dispatch<getSchoolsAction>({
        type: ActionTypes.getSchools,
        payload: response
      });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        dispatch<getSchoolsAction>({
          type: ActionTypes.getError,
          payload: err.message
        });
      } else {
        console.log('Unexpected error', err);
      }
      
    }
    

  };
}

export interface createSchoolAction {
  type: ActionTypes.createSchool | ActionTypes.getError;
  payload: School | any;
}

export const postSchool = (school : SchoolInterface) => {
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      const response = await apiServer.post<School>(
        'school', school, option
      );
      console.log('response',response)
      dispatch<createSchoolAction>({
        type: ActionTypes.createSchool,
        payload: response
      });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        dispatch<createSchoolAction>({
          type: ActionTypes.getError,
          payload: err.message
        });
      } else {
        console.log('Unexpected error', err);
      }
      
    }
    

  };
}

export interface editSchoolAction {
  type: ActionTypes.editSchool | ActionTypes.getError;
  payload: School | any;
}

export const putSchool = (school : SchoolInterface,id : number) => {
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      const response = await apiServer.put<School>(
        'school/'+ id, school, option
      );
      dispatch<editSchoolAction>({
        type: ActionTypes.editSchool,
        payload: response
      });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        dispatch<editSchoolAction>({
          type: ActionTypes.getError,
          payload: err.message
        });
      } else {
        console.log('Unexpected error', err);
      }
      
    }
    

  };
}

export interface deleteSchoolAction {
  type: ActionTypes.deleteSchool | ActionTypes.getError;
  payload: School | any;
}

export const deleteSchoolObj = (id : number) => {
  return async (dispatch: Dispatch) => {
    // let response: APIResInterface = { error: null, data: null }
    try {
      const response = await apiServer.delete<School>(
        'school/'+ id, option
      );
      dispatch<deleteSchoolAction>({
        type: ActionTypes.deleteSchool,
        payload: response
      });
    } catch (err) {
      if (err instanceof Error) {
        // ✅ TypeScript knows err is Error
        dispatch<deleteSchoolAction>({
          type: ActionTypes.getError,
          payload: err.message
        });
      } else {
        console.log('Unexpected error', err);
      }
      
    }
  };
}