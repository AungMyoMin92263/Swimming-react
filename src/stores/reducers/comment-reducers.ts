import { Action, ActionTypes } from "../actions/types";

export const commentReducers = (
  state: any = {
    result: null,
    success: null,
    send_cmt: [],
    error: null,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.getComments:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.getSendComments:
      return {
        ...state,
        send_cmt: action.payload,
        error: null,
      };
    case ActionTypes.postComment:
      return {
        ...state,
        success: action.payload ? true : false,
        error: null,
      };
    case ActionTypes.getError:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }

}