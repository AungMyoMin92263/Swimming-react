import { Action, ActionTypes } from '../actions/types';

export const globalReducers = (
  state: any = {
    result: null,
    error: null,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.getUsers:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
      case ActionTypes.getAll:
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
    case ActionTypes.getclassesByDateRange:
      return {
        ...state,
        result: action.payload,
        error: null,
      }

    default:
      return state;
  }
};


