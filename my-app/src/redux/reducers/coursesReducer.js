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
  UPDATE_COURSE_SECTION_FAILURE
} from "../actions/actionTypes";
import {updateArrOfObj} from '../../helpers/utils';


const initialState = {
  isLoading: false,
  isLoaded: false,
  user: {
    name: "John Doe",
    role: "Instructor",
    schoolName: "Akilah University",
    imageUrl: null,
    schoolLogo: null,
  },
  values: [],
  sections: [],
  section: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CREATE_COURSE_START:
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

    default:
      return state;
  }
};
