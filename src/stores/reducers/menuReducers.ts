import { Action, ActionTypes } from "./../actions/types"
import { MenuDataInterFace } from "./../model/menu.interface"

export const MenuReducers = (
    state: MenuDataInterFace = {
        menu : null
    },
    action: Action
) => {
    switch (action.type) {
        case ActionTypes.selectedMenu:
            return {
                ...state,
                menu: action.payload,
              };
        default:
            return state
    }
}