import { ASSIGNMENT_ACTION_FAILED, ASSIGNMENT_ACTION_START, CREATE_ASSIGNMENT_SUCCESS, GET_ASSIGNMENT_SUCCESS, DELETE_ASSIGNMENT_SUCCESS, UPDATE_ASSIGNMENT_SUCCESS, CREATE_ASSIGNMENT_SUBMISSION_SUCCESS, GET_ASSIGNMENT_SUBMISSION_SUCCESS, UPLOADING_ASSIGNMENT_FILE_START, UPLOAD_PROGRESS } from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isLoaded: false,
  isUploading: false,
  progress: 0,
  values: [],
  submissions: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ASSIGNMENT_ACTION_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case UPLOADING_ASSIGNMENT_FILE_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
        isUploading: true,
        progress: 1,
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
    case CREATE_ASSIGNMENT_SUBMISSION_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        isUploading: false,
        submissions: [
          ...state.submissions,      
          payload
        ]
      };
    case UPLOAD_PROGRESS:
      return {
        ...state,
        progress: payload
      };
    case GET_ASSIGNMENT_SUBMISSION_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        submissions: [
          ...payload
        ]
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
