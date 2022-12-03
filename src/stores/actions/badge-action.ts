import { refreshHeaderOptionToken } from "../../api/api-header-option";
import { ActionTypes } from "./types";
import apiServer from "../../api/api-service";
import { Dispatch } from "redux";

export interface GetMyBadgesAction {
  type: ActionTypes.getMyBadges | ActionTypes.getAllBadges | ActionTypes.getError;
  payload: any;
}
export const getMyBadges = (user_id: number) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<GetMyBadgesAction>(`own-badge/by-users/${user_id}`, options?.option);
      dispatch<GetMyBadgesAction>({
        type: ActionTypes.getMyBadges,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<GetMyBadgesAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export const getAllBadges = (schoolId : any) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<GetMyBadgesAction>(`badge/school/`+schoolId, options?.option);
      dispatch<GetMyBadgesAction>({
        type: ActionTypes.getAllBadges,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<GetMyBadgesAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface CreateBadgeAction {
  type: ActionTypes.createBadges | ActionTypes.giveBadges | ActionTypes.getError;
  payload: any;
}


export const createBadge = (data: any) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      let response = await apiServer.post('badge', data, options.option)
      dispatch<CreateBadgeAction>({
        type: ActionTypes.createBadges,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<CreateBadgeAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
}

export interface getBadgeObjAction {
  type: ActionTypes.getBadge | ActionTypes.getError;
  payload: any;
}

export const getBadgeObject = (url: string) => {
  let options = refreshHeaderOptionToken();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.get<any>(url, options.option);
      dispatch<getBadgeObjAction>({
        type: ActionTypes.getBadge,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<getBadgeObjAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export const giveBadgeToStudent = (data: any) => {
  let options = refreshHeaderOptionToken();
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      let response = await apiServer.post('own-badge', data, options.option)
      dispatch<CreateBadgeAction>({
        type: ActionTypes.createBadges,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<CreateBadgeAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  }
}

export interface CreatingBadgeAction {
  type: ActionTypes.selectBadgeIcon | ActionTypes.selectGiveBadge;
  payload: any;
}
export const selectBadgeIcon = (icon: string) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: ActionTypes.selectBadgeIcon, payload: icon })
  }
}

export const selectGiveBadge = (badge: any) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: ActionTypes.selectGiveBadge, payload: badge })
  }
}

export interface editBadgeAction {
  type: ActionTypes.editBadge | ActionTypes.getError;
  payload: any;
}

export const putBadge = (Badge: any, url: string, id: number) => {
  let options = refreshHeaderOptionToken();

  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.put<any>(
        url + '/' + id,
        Badge,
        options?.option
      );
      dispatch<editBadgeAction>({
        type: ActionTypes.editBadge,
        payload: response.data,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err: any) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err) {
        dispatch<editBadgeAction>({
          type: ActionTypes.getError,
          payload: err.response.data.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};

export interface deleteBadgeAction {
  type: ActionTypes.deleteBadge | ActionTypes.getError;
  payload: any;
}

export const deleteBadge = (url: string, id: number) => {
  let options = refreshHeaderOptionToken();


  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: ActionTypes.loading, payload: true })
      const response = await apiServer.delete<any>(url + "/" + id, options?.option);
      dispatch<deleteBadgeAction>({
        type: ActionTypes.deleteBadge,
        payload: response,
      });
      dispatch({ type: ActionTypes.loading, payload: false })
    } catch (err) {
      dispatch({ type: ActionTypes.loading, payload: false })
      if (err instanceof Error) {
        dispatch<deleteBadgeAction>({
          type: ActionTypes.getError,
          payload: err.message,
        });
      } else {
        console.log("Unexpected error", err);
      }
    }
  };
};