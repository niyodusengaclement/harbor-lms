import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import auth from "./authReducer";
import courses from './coursesReducer';
import assignments from './assignmentsReducer';

export default combineReducers({
  auth,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  courses,
  assignments,
});