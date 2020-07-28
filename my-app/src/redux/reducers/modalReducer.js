import { MODAL_POPUP } from "../actions/actionTypes";

const initialState = {
  modalShow: false,
};
export default (state = initialState, action) => {
  switch (action.type) {
    case MODAL_POPUP:
      return {
        ...state,
        modalShow: action.payload,
      };
    default:
      return state;
  }
};
