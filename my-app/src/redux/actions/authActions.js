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
          dispatch({ type: actionTypes.SIGNUP_FAILURE, error});
      });
  };
};
