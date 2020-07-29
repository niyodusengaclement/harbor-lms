import {GET_STUDENTS, GET_STUDENTS_FAILURE} from '../actions/actionTypes';

const initialState = {
    allMembers: []

}
export default (state=initialState,action) => {
    switch(action.type){
        case GET_STUDENTS : {
            return {
                ...state,
                allMembers: [...action.payload],
            }
        }
        case GET_STUDENTS_FAILURE: {
            return{
                ...state,
                error: action.error
            }
        }
        default: return state;
    }
}