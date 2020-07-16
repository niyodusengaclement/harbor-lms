import * as action from "../actions";
import * as actionTypes from "../actionTypes";

const initialState = {
  clickedTimes: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.COUNT_CLICKS: {
      return {
        ...state,
        clickedTimes: state.clickedTimes + 1,
      };
    }
    default:
      return initialState;
  }
};
