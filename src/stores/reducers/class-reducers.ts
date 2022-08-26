import { Action, ActionTypes } from "../actions/types";

export const classReducers = (
  state: any = {
    result: null,
    error: null,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.getClass:
      return {
        ...state,
        result: action.payload,
        error: null,
      };

    case ActionTypes.createClass:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.editClass:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.deleteClass:
      return {
        ...state,
        result: action.payload,
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
};
