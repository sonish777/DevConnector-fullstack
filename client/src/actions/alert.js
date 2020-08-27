import { v4 } from "uuid";
import actionTypes from "./types";

export const setAlert = (message, alertType, timeout = 5000) => {
  return (dispatch) => {
    const id = v4();
    dispatch({
      type: actionTypes.SET_ALERT,
      payload: {
        message,
        alertType,
        id,
      },
    });

    setTimeout(() => {
      dispatch({
        type: actionTypes.REMOVE_ALERT,
        payload: id,
      });
    }, timeout);
  };
};
