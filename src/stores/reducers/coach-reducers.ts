import { Action, ActionTypes } from "../actions/types";

export const coachReducers = (
  state: any = {
    result: null,
    error: null,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.getCoach:
      return {
        ...state,
        result: action.payload,
        error: null,
      };

    case ActionTypes.getCoachObj:
      return {
        ...state,
        result: action.payload,
        error: null,
      };

    case ActionTypes.createCoach:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.editCoach:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.deleteCoach:
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
