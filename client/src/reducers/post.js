import actionTypes from "../actions/types";

const INITIAL_STATE = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

const postReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.GET_POSTS:
      return {
        ...state,
        ...payload.data,
        loading: false,
      };

    case actionTypes.GET_POST:
      return {
        ...state,
        ...payload.data,
        loading: false,
      };

    case actionTypes.ADD_POST:
      // console.log(payload)
      return {
        ...state,
        posts: [payload.data.post, ...state.posts],
        loading: false,
      };

    case actionTypes.POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case actionTypes.UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === payload.id ? payload.post : post
        ),
      };

    case actionTypes.UPDATE_COMMENTS:
      return {
        ...state,
        loading: false,
        post: payload.data.post,
      };

    case actionTypes.DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter((post) => post._id !== payload.id),
      };

    default:
      return state;
  }
};

export default postReducer;
