import { LOGIN_USER, IS_LOGGED_IN, SIGNOUT_USER } from "../actions/type";

const INITIAL_STATE = {
  currentUser: null,
  isAuth: false
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    case IS_LOGGED_IN:
      return {
        ...state,
        isAuth: action.payload
      };
    case SIGNOUT_USER:
      return {
        ...state,
        isAuth: false,
        currentUser: null
      };
    default:
      return state;
  }
}
