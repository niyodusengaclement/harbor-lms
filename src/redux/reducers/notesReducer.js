import { NOTE_ACTION_START, CREATE_NOTE_SUCCESS, NOTE_ACTION_FAILED , GET_NOTE_SUCCESS, DELETE_NOTE_SUCCESS, UPDATE_NOTE_SUCCESS, NOTE_UPLOAD_PROGRESS, UPLOADING_NOTE_FILE_START } from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  isLoaded: false,
  progress: 0,
  values: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case NOTE_ACTION_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case UPLOADING_NOTE_FILE_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
        isUploading: true,
        progress: 1,
      };
    case NOTE_UPLOAD_PROGRESS:
      return {
        ...state,
        progress: payload
      };
    case CREATE_NOTE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        isUploading: false,
        values: [...state.values, payload],
      };
    case GET_NOTE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: [...payload],
      };
    case DELETE_NOTE_SUCCESS:
      const values = state.values.filter(({ id }) => id !== payload);
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values
      };
    case UPDATE_NOTE_SUCCESS:
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
    case NOTE_ACTION_FAILED: 
    return {
      ...state,
      sections: payload
    };

    default:
      return state;
  }
};
