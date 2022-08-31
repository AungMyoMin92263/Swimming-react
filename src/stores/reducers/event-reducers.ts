import { Action, ActionTypes } from "../actions/types";

export const eventReducers = (
  state: any = {
    result: null,
    error: null,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.getEvent:
      return {
        ...state,
        result: action.payload,
        error: null,
      };

    case ActionTypes.createEvent:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.editEvent:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.deleteEvent:
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
