import { refreshHeaderOptionToken } from "../../api/api-header-option";
import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import { Dispatch } from "redux";

export interface GetMyAttendanceAction {
  type: ActionTypes.getMyAttendance | ActionTypes.getClassAttendance | ActionTypes.getError;
  payload: any;
}
export const getMyAttend = (student_id: number) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<GetMyAttendanceAction>(`attendance/byStudent/${student_id}`, options?.option);
      dispatch<GetMyAttendanceAction>({
        type: ActionTypes.getMyAttendance,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<GetMyAttendanceAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export const getMyAttendByRange = (studentId: number,month?: string) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<GetMyAttendanceAction>(`attendance/student/${studentId}/range?month=${month}`, options?.option);
      dispatch<GetMyAttendanceAction>({
        type: ActionTypes.getMyAttendance,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<GetMyAttendanceAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export const getClassAttend = (classId: number) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<GetMyAttendanceAction>(`/attendance/byClass/${classId}`, options?.option);
      dispatch<GetMyAttendanceAction>({
        type: ActionTypes.getClassAttendance,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<GetMyAttendanceAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface CreateAttendanceAction {
  type: ActionTypes.createAttendance | ActionTypes.getError;
  payload: any;
}

export const createAttendance = (data: any) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      let response = await apiServer.post('attendance', data, options.option)
      dispatch<CreateAttendanceAction>({
        type: ActionTypes.createAttendance,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<CreateAttendanceAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
}