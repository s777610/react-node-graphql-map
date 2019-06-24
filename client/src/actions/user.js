import { LOGIN_USER, IS_LOGGED_IN } from "./type";

export const loginUser = me => {
  return {
    type: LOGIN_USER,
    payload: me
  };
};

export const isLoggedIn = isSignedIn => {
  return {
    type: IS_LOGGED_IN,
    payload: isSignedIn
  };
};
