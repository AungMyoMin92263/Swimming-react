import { Action, ActionTypes } from "../actions/types";

export const classReducers = (
  state: any = {
    result: null,
    error: null,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.getclassesByDate:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.getclassesByDateRange:
      return {
        ...state,
        result: action.payload,
        error: null,
      };

    case ActionTypes.getClass:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.getClassObj:
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
    case ActionTypes.inviteStudent:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.inviteCoach:
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
