import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import { Dispatch } from "redux";
import { Class } from "../model/class";
import { ClassInterface, ClassProgramInterface } from "../model/class-interface";
import { refreshHeaderOptionToken } from "../../api/api-header-option";
// import { AxiosRequestConfig } from "axios";


export interface getClassAction {
  type: ActionTypes.getClass | ActionTypes.getError;
  payload: Class | Class[] | any;
}

export const getAllclasses = (url: string) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<Class>(url, options.option);
      dispatch<getClassAction>({
        type: ActionTypes.getClass,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
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

export const getclassesByDate = (url: string) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<Class>(url, options.option);
      dispatch<getClassAction>({
        type: ActionTypes.getClass,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
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
  type: ActionTypes.getClassObj | ActionTypes.getClassDetail | ActionTypes.getError;
  payload: Class | any;
}

export const getClassObject = (url: string, detail?: boolean) => {
  let options = refreshHeaderOptionToken();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<Class>(url, options.option);
      dispatch<getClassObjAction>({
        type: detail ? ActionTypes.getClassDetail : ActionTypes.getClassObj,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
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

export const postClass = (classe: ClassInterface, url: string) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.post<Class>(
        url, classe, options?.optionImage
      );

      dispatch<createClassAction>({
        type: ActionTypes.createClass,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
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


export interface createClassProgramAction {
  type: ActionTypes.createClassProgram | ActionTypes.getError;
  payload: ClassProgramInterface | any;
}
export const postClassProgram = (classProgram: ClassProgramInterface, url: string) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      let response
      let id = classProgram.id
      delete classProgram.id
      dispatch({ type: ActionTypes.loading, payload: true })
      if (id && id !== 0) {
        response = await apiServer.put<Class>(
          url + "/" + id, classProgram, options?.optionImage
        );
      } else {
        response = await apiServer.post<Class>(
          url, classProgram, options?.optionImage
        );
      }
      dispatch<createClassProgramAction>({
        type: ActionTypes.createClassProgram,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<createClassProgramAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export const getClassProgram = (url: string) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<ClassProgramInterface>(
        url,
        options.option
      );
      dispatch<createClassProgramAction>({
        type: ActionTypes.createClassProgram,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<createClassProgramAction>({
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

export const putClass = (classe: ClassInterface, url: string, id: number) => {
  let options = refreshHeaderOptionToken();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.put<Class>(
        url + '/' + id,
        classe,
        options?.optionImage
      );
      dispatch<editClassAction>({
        type: ActionTypes.editClass,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
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

export const deleteClass = (url: string, id: number) => {
  let options = refreshHeaderOptionToken();


  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.delete<Class>(url + "/" + id, options?.option);
      dispatch<deleteClassAction>({
        type: ActionTypes.deleteClass,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
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

export const inviteStudent = (emails: any) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.post<Class>(
        'assigned/class/student', emails, options?.option
      );

      dispatch<inviteStudentAction>({
        type: ActionTypes.inviteStudent,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<inviteStudentAction>({
          type: ActionTypes.getError,
          payload: err.response.data? err.response.data.message :  err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface inviteCoachAction {
  type: ActionTypes.inviteCoach | ActionTypes.getError;
  payload: any;
}

export const inviteCoach = (emails: any) => {
  let options = refreshHeaderOptionToken();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.post<Class>(
        'assigned/class/coache', emails, options?.option
      );

      dispatch<inviteCoachAction>({
        type: ActionTypes.inviteCoach,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        console.log('err',err)
        dispatch<inviteCoachAction>({
          type: ActionTypes.getError,
          payload: err.response.status === 400? err.response.data.message[0] : err.response.data.message,
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
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<Class>(url, options.option);
      dispatch<getclassesByDateAction>({
        type: ActionTypes.getclassesByDateRange,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
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

export interface getAssignUserByClassAction {
  type: ActionTypes.getAssignUserByClass | ActionTypes.getError;
  payload: any;
}

export const getAssignUserByClass = (url: string) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<any>(url, options.option);
      dispatch<getAssignUserByClassAction>({
        type: ActionTypes.getAssignUserByClass,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<getAssignUserByClassAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
}