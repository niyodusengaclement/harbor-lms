import { toast } from 'react-toastify';
import { ASSIGNMENT_ACTION_FAILED, ASSIGNMENT_ACTION_START, CREATE_ASSIGNMENT_SUCCESS, GET_ASSIGNMENT_SUCCESS, DELETE_ASSIGNMENT_SUCCESS, UPDATE_ASSIGNMENT_SUCCESS, CREATE_ASSIGNMENT_SUBMISSION_SUCCESS, GET_ASSIGNMENT_SUBMISSION_SUCCESS } from "./actionTypes";
import actionCreator from "./actionCreator";

export const createAssignment = (newAssignment) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionCreator(ASSIGNMENT_ACTION_START));
    return firestore
          .collection("assignments")
          .add(newAssignment)
          .then((doc)=>{
              const res = newAssignment;
              res.id = doc.id;
              toast.success('Assignment created successfully', {
                position: "top-center",
                hideProgressBar: true,
              });
              return dispatch(actionCreator(CREATE_ASSIGNMENT_SUCCESS, res));
          })
          .catch((err) => {
            toast.error('Something went wrong', {
              position: "top-center",
              hideProgressBar: true,
            });
            return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
      });
  };
};

export const getAssignments = (courseId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(ASSIGNMENT_ACTION_START));
      const assignments = [];
      const assRef = firestore.collection("assignments");
      const ass = await assRef.where('courseId', '==', courseId).get();
      if(ass.empty) {
        return dispatch(actionCreator(GET_ASSIGNMENT_SUCCESS, []));
      }
      ass.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        assignments.push(data)
      });
      return dispatch(actionCreator(GET_ASSIGNMENT_SUCCESS, assignments));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
    }
  };
};

export const updateAssignment = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(ASSIGNMENT_ACTION_START));
      const assignments = [];
      const assRef = firestore.collection("assignments").doc(data.id);
      const update = await assRef.update(data);
        toast.success(`Assignment updated successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });
        return dispatch(actionCreator(UPDATE_ASSIGNMENT_SUCCESS, data));
      
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
    }
  };
};

export const publishOrUnpublishAssignment = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const assignment = firestore.collection("assignments").doc(data.id);
    data.isPublished = !data.isPublished
    return assignment.update(data)
    .then((res)=>{
      toast.success(`Assignment ${data.isPublished ? 'published' : 'unpublished'} successfully`, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(GET_ASSIGNMENT_SUCCESS, assignment));
    })
    .catch((err) => {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
    });
  };
};

export const deleteAssignment = (assignmentId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(ASSIGNMENT_ACTION_START));
      const assRef = firestore.collection("assignments").doc(assignmentId).delete();
      if(assRef) {
        toast.success('Assignment deleted successfully', {
          position: "top-center",
          hideProgressBar: true,
        });

        return dispatch(actionCreator(DELETE_ASSIGNMENT_SUCCESS, assignmentId));
      }
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
    }
  };
};

export const submitAssignment = (submission) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionCreator(ASSIGNMENT_ACTION_START));
    return firestore
          .collection("assignmentSubmissions")
          .add(submission)
          .then((doc)=>{
              const res = submission;
              res.id = doc.id;
              toast.success('Assignment submitted successfully', {
                position: "top-center",
                hideProgressBar: true,
              });
              return dispatch(actionCreator(CREATE_ASSIGNMENT_SUBMISSION_SUCCESS, res));
          })
          .catch((err) => {
            toast.error(err, {
              position: "top-center",
              hideProgressBar: true,
            });
            return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
      });
  };
};

export const getSubmissions = (assignmentId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(ASSIGNMENT_ACTION_START));
      const submissions = [];
      const ref = firestore.collection("assignmentSubmissions");
      const sub = await ref.where('assignmentId', '==', assignmentId).get();
      if(sub.empty) {
        return dispatch(actionCreator(GET_ASSIGNMENT_SUBMISSION_SUCCESS, []));
      }
      sub.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        submissions.push(data);
      });
      return dispatch(actionCreator(GET_ASSIGNMENT_SUBMISSION_SUCCESS, submissions));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
    }
  };
};

export const updateSubmission = (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(ASSIGNMENT_ACTION_START));
      const ref = firestore.collection("assignmentSubmissions").doc(data.id);
      
      const u = await ref.update(data);
        toast.success(`Submission Updated successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });
        return dispatch(actionCreator(GET_ASSIGNMENT_SUBMISSION_SUCCESS, data));
      
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(ASSIGNMENT_ACTION_FAILED, err));
    }
  };
};
