import { Action, ActionTypes } from "../actions/types";

export const studentReducers = (
  state: any = {
    result: null,
    own_students: [],
    error: null,
  },
  action: Action
) => {
  switch (action.type) {

    case ActionTypes.getStudent:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.getOwnStudent:
      return {
        ...state,
        own_students: action.payload,
        error: null,
      };

    case ActionTypes.getStudentObj:
      return {
        ...state,
        result: action.payload,
        error: null,
      };

    case ActionTypes.createStudent:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.editStudent:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.deleteStudent:
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
