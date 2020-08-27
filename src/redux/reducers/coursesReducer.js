import {
  CREATE_COURSE_FAILURE,
  CREATE_COURSE_SUCCESS,
  CREATE_COURSE_START,
  GET_COURSE_SUCCESS,
  CREATE_COURSE_SECTION_SUCCESS,
  CREATE_COURSE_SECTION_FAILURE,
  GET_COURSE_SECTIONS,
  GET_COURSE_SPECIFIC_SECTION,
  UPDATE_COURSE_SECTION_SUCCESS,
  UPDATE_COURSE_SECTION_FAILURE,
  UPDATE_COURSE_MEMBERS,
  GET_COURSE_MEMBERS,
  ACTION_START
} from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  isLoaded: false,
  values: [],
  sections: [],
  section: {},
  members: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_COURSE_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case ACTION_START:
      return {
        ...state,
        isLoaded: false,
        isLoading: true,
      };
    case CREATE_COURSE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: [...state.values, payload],
      };
    case GET_COURSE_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        isLoading: false,
        values: [...payload],
      };
    case CREATE_COURSE_FAILURE:
      return {
        ...state,
        isLoaded: true,
        error: payload,
      };
      case CREATE_COURSE_SECTION_SUCCESS: 
      return{
        ...state,
        sections: [
          ...state.sections,
          payload
        ]
      };
      case CREATE_COURSE_SECTION_FAILURE:
        return {
          ...state,
          error: payload
        }
      case GET_COURSE_SECTIONS: 
      return {
        ...state,
        sections: payload
      };
      case GET_COURSE_SPECIFIC_SECTION:
        return {
          ...state,
          section: payload
        };
      case UPDATE_COURSE_SECTION_SUCCESS:
      return {
        ...state,
        section: payload
      };
      case UPDATE_COURSE_SECTION_FAILURE:
      return {
        ...state,
        error: payload
      }
      case UPDATE_COURSE_MEMBERS:
        return {
          ...state,
          members: {
            ...state.members,
            ...payload
          },
        };
      case GET_COURSE_MEMBERS:
        return{
          ...state,
          members: payload
        };

    default:
      return state;
  }
};
