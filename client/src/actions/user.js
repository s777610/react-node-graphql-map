import { LOGIN_USER } from "./type";

export const loginUser = me => {
  return {
    type: LOGIN_USER,
    payload: me
  };
};
