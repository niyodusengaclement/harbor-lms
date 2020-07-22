import * as actionTypes from "./actionTypes";
import { toast } from "react-toastify";

export const signup = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((resp) => {
        const { password, ...userInfo } = newUser;
        return firestore
          .collection("users")
          .doc(resp.user.uid)
          .set({
            ...userInfo,
            initials: newUser.fullName[0],
          });
      })
      .then((response) => {
        dispatch({ type: actionTypes.SIGNUP_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: actionTypes.SIGNUP_FAILURE, error });
      });
  };
};

export const login = (user) => {
  return async (dispatch, state, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    const snapshot = await firestore.collection('users').where('studentUniqueNumber','==', parseInt(user.emailOrStudentUniqueNumber)).get();
    let studentEmail;
    if(snapshot.empty) studentEmail = user.emailOrStudentUniqueNumber;
    else snapshot.forEach(doc => {
      studentEmail = doc.data().email;
    });
    

    firebase
      .auth()
      .signInWithEmailAndPassword(studentEmail, user.password)
      .then( (doc) => {
        localStorage.setItem('rems_user_id', doc.user.uid);
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          response: {message: 'success'}
        });
      })
      .catch((error) => {
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          error
        })
      })
  };
};
export const logout = () => {
  return async (dispatch, state, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().signOut().then(function() {
      localStorage.removeItem('rems_user_id');
      localStorage.removeItem('rems_user_profile');
      toast.success('You are successfully logged out', {
        hideProgressBar: true,
        position: 'top-center'
      });
      window.location.replace('/login');
    }).catch(function(error) {
      toast.error(error, {
        hideProgressBar: true,
        position: 'top-center'
      });
    });
  };
};
