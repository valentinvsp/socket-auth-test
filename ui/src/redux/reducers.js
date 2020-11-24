import { LOG_IN, LOG_OUT } from "./action-types";
import { combineReducers } from "redux";

const initialState = {
    user: null,
    authenticated: false
};

export function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN: {
      const { username } = action.payload;
      return {
        ...state,
        user: username,
        authenticated: true
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        user: null,
        authenticated: false
      };
    }
    default:
      return state;
  }
}

export default combineReducers({ authReducer });
