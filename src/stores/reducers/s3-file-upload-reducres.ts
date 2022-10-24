import { Action, ActionTypes } from "../actions/types";

export const S3FileReducres = (
  state: any = {
    image: null,
    error: null,
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.uploadFileS3:
      return {
        ...state,
        image: action.payload,
        error: null,
      };
    default:
      return state;
  }
}