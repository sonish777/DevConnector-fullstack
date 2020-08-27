import actionTypes from "./types";
import { setAlert } from "./alert";
import axios from "axios";

// GET POSTS

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts`);

      dispatch({
        type: actionTypes.GET_POSTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

// GET POST

export const getPost = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/posts/${id}`);

      dispatch({
        type: actionTypes.GET_POST,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

// ADD LIKES

export const addLike = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(`/api/posts/${postId}/like`);

      dispatch({
        type: actionTypes.UPDATE_LIKES,
        payload: {
          ...res.data.data,
          id: postId,
        },
      });
    } catch (error) {
      // console.log("ERROR", error.response.data);
      dispatch(setAlert(error.response.data.message, "danger"));
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

// REMOVE LIKE

export const removeLike = (postId) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(`/api/posts/${postId}/unlike`);

      dispatch({
        type: actionTypes.UPDATE_LIKES,
        payload: {
          ...res.data.data,
          id: postId,
        },
      });
    } catch (error) {
      dispatch(setAlert(error.response.data.message, "danger"));
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

// DELETE POST

export const deletePost = (postId) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/posts/${postId}`);

      dispatch({
        type: actionTypes.DELETE_POST,
        payload: {
          id: postId,
        },
      });

      dispatch(setAlert("Post Removed", "success"));
    } catch (error) {
      dispatch(setAlert(error.response.data.message, "danger"));
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

// ADD POST

export const addPost = (data) => {
  return async (dispatch) => {
    try {
      const res = await axios.post(`/api/posts`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: actionTypes.ADD_POST,
        payload: res.data,
      });

      dispatch(setAlert("Post Created", "success"));
    } catch (error) {
      dispatch(setAlert(error.response.data.message, "danger"));
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

// ADD COMMENT

export const addComment = (postId, data) => {
  return async (dispatch) => {
    try {
      const res = await axios.patch(`/api/posts/${postId}/comment`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      dispatch({
        type: actionTypes.UPDATE_COMMENTS,
        payload: res.data,
      });

      dispatch(setAlert("Comment Added", "success"));
    } catch (error) {
      dispatch(setAlert(error.response.data.message, "danger"));
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};

// DELETE COMMENT

export const removeComment = (postId, commentId) => {
  return async (dispatch) => {
    try {
      const res = await axios.delete(
        `/api/posts/${postId}/comment/${commentId}`
      );

      dispatch({
        type: actionTypes.UPDATE_COMMENTS,
        payload: res.data,
      });

      dispatch(setAlert("Comment Removed", "success"));
    } catch (error) {
      dispatch(setAlert(error.response.data.message, "danger"));
      dispatch({
        type: actionTypes.POST_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status,
          data: error.response.data,
        },
      });
    }
  };
};
