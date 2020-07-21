import * as actionTypes from "./actionTypes";

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
  return (dispatch, state, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(user.emailOrStudentUniqueNumber, user.password)
      .then(() => {
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