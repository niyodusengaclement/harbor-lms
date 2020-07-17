import * as actionTypes from "./actionTypes";
import actionCreator from "./actionCreator";

export const countClicks = (counts) => {
  return {
    type: actionTypes.COUNT_CLICKS,
    payload: counts,
  };
};
