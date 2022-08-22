import { MenuDataInterFace } from "../model/menu.interface";
import { ActionTypes } from "./types";
import { Dispatch } from "redux";

export interface SelectedMenuAction{ 
    type: ActionTypes.selectedMenu;
    payload: MenuDataInterFace;
}

export const selectedMenuAction = (menu: MenuDataInterFace) => {
    // return {
    //     type: ActionTypes.selectedMenu,
    //     payload: menu
    // };
    return async (dispatch: Dispatch) => {
        dispatch<SelectedMenuAction>({
            type: ActionTypes.selectedMenu,
            payload: menu,
          });
      };
};