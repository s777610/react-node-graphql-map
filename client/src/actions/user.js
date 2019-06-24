import { LOGIN_USER, IS_LOGGED_IN, SIGNOUT_USER } from "./type";

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

export const signoutUser = () => {
  return {
    type: SIGNOUT_USER
  };
};
