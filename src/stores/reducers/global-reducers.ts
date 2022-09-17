import { Action, ActionTypes } from '../actions/types';

export const globalReducers = (
  state: any = {
    result: null,
    error: null,
    loading: 0
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

    case ActionTypes.getclassesByDateRange:
      return {
        ...state,
        result: action.payload,
        error: null,
      }

    case ActionTypes.loading:
      let count: number = state.loading
      if (action.payload)
        count += 1
      else {
        if (count > 0)
          count -= 1
      }
      return {
        ...state,
        loading: count,
      }

    case ActionTypes.getError:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};


