import * as actionTypes from "../actions/actionTypes";

const initialState = {
  auth: {},
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        loading: false,
        authError: null
      }
    }
    case actionTypes.SIGNUP_FAILURE: {
        return {
          ...state,
          authError: {...action.error},
          loading: false
        }
      }
      case actionTypes.LOGIN_SUCCESS: {
        return {
          ...state,
          authResponse: {...action.response},
          loading: false
        }
      }
      case actionTypes.LOGIN_FAILURE: {
        return {
          ...state,
          authError: {...action.error},
          loading: false
        }
      }
    default: return state;
  }
};