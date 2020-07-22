import { GET_STUDENTS,GET_STUDENTS_FAILURE } from "./actionTypes";

export const getStudents = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const students = [];
    return firestore
      .collection("users")
      // .where('role', '==', 'student')
      .get()
      .then((res) => {
        res.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          students.push(data);
        });
        console.log("studetns: ", students);
        return dispatch({
          type: GET_STUDENTS,
          payload: students,
        });
      })
      .catch((error) => {
          return dispatch({
            type: GET_STUDENTS_FAILURE,
            error,
        });
      });
  };
};
