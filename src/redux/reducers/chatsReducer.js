import { CHAT_ACTION_START, GET_CHAT_SUCCESS, SAVE_CHAT_SUCCESS, CHAT_ACTION_FAILED } from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isLoaded: false,
  allChats: []
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHAT_ACTION_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case SAVE_CHAT_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        allChats: [
          ...state.allChats,
          payload
        ]
      };
    case GET_CHAT_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        allChats: [
          ...payload
        ]
      };
    case CHAT_ACTION_FAILED:
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
