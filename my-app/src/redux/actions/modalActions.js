import { MODAL_POPUP } from "./actionTypes";

export const showModal = (flag) => {
    return (dispatch) => {
        dispatch({
            type: MODAL_POPUP,
            payload: flag
        })
    }
}