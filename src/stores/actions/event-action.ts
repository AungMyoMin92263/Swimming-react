import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import { Dispatch } from "redux";
import { AxiosRequestConfig } from "axios";
import { getItem } from "../../auth/LocalStorage";
import { EventInterface } from "../model/event-interface";
import { Event } from "../model/event";

var token = '';
var option: AxiosRequestConfig;

export const refreshTokenEvent = () => {
  const authUser = JSON.parse(getItem("authUser") || "null");
  if (authUser && authUser.userInfo) {
  token = authUser.userInfo.data.token;

  option = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
}
}

export interface getEventAction {
  type: ActionTypes.getEvent | ActionTypes.getError;
  payload: Event | Event[] | any;
}

export const getAllEvents =  (url : string) => {
  refreshTokenEvent();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.get<Event>(url, option);
      dispatch<getEventAction>({
        type: ActionTypes.getEvent,
        payload: response.data,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<getEventAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface createEventAction {
  type: ActionTypes.createEvent | ActionTypes.getError;
  payload: Event | any;
}

export const postEvent = (evente : EventInterface,url : string) => {
  refreshTokenEvent();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.post<Event>(
        url, evente, option
      );

      dispatch<createEventAction>({
        type: ActionTypes.createEvent,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<createEventAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface editEventAction {
  type: ActionTypes.editEvent | ActionTypes.getError;
  payload: Event | any;
}

export const putEvent = (evente: EventInterface, url : string, id: number) => {
  refreshTokenEvent();
  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.put<Event>(
        url+'/' + id,
        evente,
        option
      );
      dispatch<editEventAction>({
        type: ActionTypes.editEvent,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<editEventAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface deleteEventAction {
  type: ActionTypes.deleteEvent | ActionTypes.getError;
  payload: Event | any;
}

export const deleteEvent = (url : string,id: number) => {
  refreshTokenEvent();

  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.delete<Event>(url+"/" + id, option);
      dispatch<deleteEventAction>({
        type: ActionTypes.deleteEvent,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<deleteEventAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface inviteEventAction {
  type: ActionTypes.inviteEvent | ActionTypes.getError;
  payload: any;
}

export const inviteEvent = (emails : any) => {
  refreshTokenEvent();

  return async (dispatch: Dispatch) => {
    try {
      const response = await apiServer.post<Event>(
        'assigned/event', emails, option
      );

      dispatch<inviteEventAction>({
        type: ActionTypes.inviteEvent,
        payload: response,
      });
    } catch (err) {
      if (err instanceof Error) {
        dispatch<inviteEventAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};



