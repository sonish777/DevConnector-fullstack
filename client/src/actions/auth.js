import axios from "axios";
import actionTypes from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../utils/setAuthToken";

// LOAD USER
export const loadUser = () => {
  return async (dispatch) => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(`/api/users/me`);
      dispatch({
        type: actionTypes.USER_LOADED,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.AUTH_ERROR,
      });
    }
  };
};

// REGISTER USER
export const register = ({ name, email, password }) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/users`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch({
        type: actionTypes.REGISTER_SUCCESS,
        payload: response.data,
      });
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data;
      // console.log(errors);
      if (errors.message) {
        const msgs = errors.message
          .replace("User validation failed:", "")
          .split(",");
        msgs.map((msg) => dispatch(setAlert(msg, "danger")));
      }

      dispatch({
        type: actionTypes.REGISTER_FAIL,
      });
    }
  };
};

// LOGIN

export const login = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/api/users/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // dispatch(loadUser());
      dispatch({
        type: actionTypes.LOGIN_SUCCESS,
        payload: res.data,
      });

      dispatch(loadUser());
    } catch (error) {
      let msg = "";
      if ((msg = error.response.data.message)) {
        dispatch(setAlert(msg, "danger"));
      }
      dispatch({
        type: actionTypes.LOGIN_FAIL,
      });
    }
  };
};

// LOGOUT

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: actionTypes.CLEAR_PROFILE,
    });
    dispatch({
      type: actionTypes.LOGOUT,
    });
  };
};
