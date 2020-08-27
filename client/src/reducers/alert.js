import actionTypes from "../actions/types";

const INITIAL_STATE = [];

const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_ALERT:
      return [...state, action.payload];

    case actionTypes.REMOVE_ALERT: {
      return state.filter((alert) => alert.id !== action.payload);
    }

    default: {
      return state;
    }
  }
};

export default alertReducer;
