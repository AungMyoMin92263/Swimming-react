import { Action, ActionTypes } from '../actions/types';

export const peopleReducers = (
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
    case ActionTypes.getError:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};


