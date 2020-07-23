import { ASSIGNMENT_ACTION_FAILED, ASSIGNMENT_ACTION_START, CREATE_ASSIGNMENT_SUCCESS, GET_ASSIGNMENT_SUCCESS, DELETE_ASSIGNMENT_SUCCESS, UPDATE_ASSIGNMENT_SUCCESS } from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isLoaded: false,
  values: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ASSIGNMENT_ACTION_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case CREATE_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: [
          ...state.values,
          payload
        ]
      };
    case UPDATE_ASSIGNMENT_SUCCESS:
      const rest = state.values.filter(({ id }) => id !== payload.id);
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: [
          ...rest,
          payload
        ]
      };
    case GET_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: [
          ...payload
        ]
      };
    case DELETE_ASSIGNMENT_SUCCESS:
      const values = state.values.filter(({ id }) => id !== payload);
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values
      };
    case ASSIGNMENT_ACTION_FAILED:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        error: payload,
      };
    default:
      return state;
  }
};
