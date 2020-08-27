import axios from "axios";
import { setAlert } from "./alert";

import actionTypes from "./types";
import setAuthToken from "../utils/setAuthToken";

// GET CURRENT USERS PROFILE

export const getCurrentProfile = () => {
  return async (dispatch) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.get("/api/profiles/me");
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

// GET ALL PROFILE

export const getProfiles = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get("/api/profiles");
      dispatch({
        type: actionTypes.GET_PROFILES,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

// GET PROFILE BY ID

export const getProfileById = (userId) => {
  return async (dispatch) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.get(`/api/profiles/user/${userId}`);
      // console.log(res.data);
      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

// GET GITHUB REPOS

export const getGithubRepos = (username) => {
  return async (dispatch) => {
    try {
      if (localStorage.token) {
        setAuthToken(localStorage.token);
      }
      const res = await axios.get(`/api/profiles/github/${username}`);
      dispatch({
        type: actionTypes.GET_REPOS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });

      dispatch(setAlert(error.response.data.message, "danger"));
    }
  };
};

// CREATE OR UPDATE PROFILE

export const createProfile = (formData, history, edit = false) => {
  return async (dispatch) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(`/api/profiles/`, formData, config);

      dispatch({
        type: actionTypes.GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? "Profile Updated" : "Profile Created", "success ")
      );

      if (!edit) {
        history.push("/dashboard");
      }
    } catch (error) {
      dispatch(setAlert(error.response.data.message, "danger"));
      dispatch({
        type: actionTypes.PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

export const addEducation = (formData, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/profiles/education", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: actionTypes.UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Education details added", "success"));
      history.push("/dashboard");
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_ERROR,
      });
      if (error.response.data.message) {
        error.response.data.message
          .split(",")
          .forEach((err) => dispatch(setAlert(err, "danger")));
      }
    }
  };
};

export const addExperience = (formData, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post("/api/profiles/experience", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: actionTypes.UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert("Experience details added", "success"));
      history.push("/dashboard");
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_ERROR,
      });
      if (error.response.data.message) {
        error.response.data.message
          .split(",")
          .forEach((err) => dispatch(setAlert(err, "danger")));
      }
    }
  };
};

// DELETE EXPERIENCE

export const deleteExperience = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profiles/experience/${id}`);

      dispatch({
        type: actionTypes.UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert("Experience Removed", "success"));
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_ERROR,
      });
    }
  };
};

export const deleteEducation = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(`/api/profiles/education/${id}`);

      dispatch({
        type: actionTypes.UPDATE_PROFILE,
        payload: res.data,
      });

      dispatch(setAlert("Education Removed", "success"));
    } catch (error) {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_ERROR,
      });
    }
  };
};
