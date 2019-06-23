import { LOGIN_USER } from "../actions/type";

const INITIAL_STATE = {
  currentUser: null
};

export default function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
}
