import actionTypes from "../actions/types";

const INITIAL_STATE = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {},
};

const profileReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_PROFILE:
      return {
        ...state,
        ...payload.data,
        loading: false,
      };

    case actionTypes.GET_PROFILES:
      return {
        ...state,
        profiles: payload.profiles,
        loading: false,
      };

    case actionTypes.GET_REPOS:
      return {
        ...state,
        ...payload.data,
        loading: false,
      };

    case actionTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case actionTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };

    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        ...payload.data,
        loading: false,
      };

    case actionTypes.UPDATE_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};

export default profileReducer;
