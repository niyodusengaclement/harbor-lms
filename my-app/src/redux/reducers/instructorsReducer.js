import {SEND_INVITATIONS,SEND_INVITATIONS_ERROR} from '../actions/actionTypes';

const initialState = {
    

}
export default (state=initialState,action) => {
    switch(action.type){
        case SEND_INVITATIONS : {
            return {
                ...state,
                invitees: action.payload
            }
        }
        case SEND_INVITATIONS_ERROR : {
            return {
                ...state,
                error: action.error
            }
        }
        default: return state;
    }
}