import { Action, ActionTypes } from "../actions/types";

export const badgeReducers = (
  state: any = {
    result: null,
    my_list: [null],
    badges_list: [],
    error: null,
    selectedIcon: null,
    selectedBadge: null
  },
  action: Action
) => {
  switch (action.type) {
    case ActionTypes.getMyBadges:
      return {
        ...state,
        my_list: action.payload,
        error: null,
      };
    case ActionTypes.getAllBadges:
      return {
        ...state,
        badges_list: action.payload,
        error: null,
      };

      case ActionTypes.getBadge:
        return {
          ...state,
          result: action.payload,
          error: null,
        };

        case ActionTypes.editBadge:
        return {
          ...state,
          editBadge: action.payload,
          error: null,
        };

    case ActionTypes.createBadges:
      return {
        ...state,
        result: action.payload,
        error: null,
      };

    case ActionTypes.giveBadges:
      return {
        ...state,
        result: action.payload,
        error: null,
      };
    case ActionTypes.selectBadgeIcon:
      return {
        ...state,
        selectedIcon: '/assets/icons/' + action.payload
      }
    case ActionTypes.selectGiveBadge:
      return {
        ...state,
        selectedBadge: action.payload
      }
    default:
      return state;
  }
};
