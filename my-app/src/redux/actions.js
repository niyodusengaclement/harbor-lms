import * as actionTypes from "./actionTypes";

export const countClicks = (counts) => {
  return {
    type: actionTypes.COUNT_CLICKS,
    payload: counts,
  };
};
