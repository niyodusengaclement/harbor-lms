import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import auth from "./authReducer";
import courses from './coursesReducer';
export default combineReducers({
  auth,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  courses,
});