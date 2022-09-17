import { Action, ActionTypes } from "../actions/types";

export const attandanceReducers = (
  state: any = {
    result: null,
    attandance_list: null,
    error: null,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.getMyAttendance:
      return {
        ...state,
        attandance_list: action.payload,
        error: null,
      };
    case ActionTypes.createAttendance:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    default:
      return state;
  }
};
