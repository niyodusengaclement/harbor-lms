import { combineReducers } from "redux";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";
import auth from "./authReducer";

export default combineReducers({
  auth,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});
