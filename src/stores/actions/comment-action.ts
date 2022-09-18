import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import { Dispatch } from "redux";
import { Class } from "../model/class";
import { refreshHeaderOptionToken } from "../../api/api-header-option";
import { CommentInterface } from "../model/comment.interface";
// import { AxiosRequestConfig } from "axios";


export interface CommentAction {
  type: ActionTypes.postComment | ActionTypes.getComments | ActionTypes.getOwnStudent | ActionTypes.getSendComments | ActionTypes.getError;
  payload: CommentInterface | CommentInterface[] | any;
}

export const getAllComment = (url: string) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<CommentInterface>(url, options?.option);
      dispatch<CommentAction>({
        type: ActionTypes.getComments,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<CommentAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export const getSendComment = (receiverId: number, receiverType: string) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<CommentInterface>(`comment/send-cmt/${receiverId}?receiver_type=${receiverType}`, options?.option);
      dispatch<CommentAction>({
        type: ActionTypes.getSendComments,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<CommentAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};


export const postComment = (commentInfo: any) => {
  let options = refreshHeaderOptionToken()
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.post<any>(
        "comment", commentInfo, options.option
      );

      dispatch<CommentAction>({
        type: ActionTypes.postComment,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<CommentAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};