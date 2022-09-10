import { Action, ActionTypes } from "../actions/types";

export const schoolReducers = (
  state: any = {
    result: null,
    error: null,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.getSchools:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
      
      case ActionTypes.getSchoolObj:
        return {
          ...state,
          result: action.payload,
          error: null,
        };

    case ActionTypes.createSchool:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.editSchool:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.deleteSchool:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
      case ActionTypes.inviteManager:
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
