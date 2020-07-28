import {
  CREATE_COURSE_FAILURE,
  CREATE_COURSE_SUCCESS,
  GET_COURSE_FAILURE,
  GET_COURSE_SUCCESS,
  CREATE_COURSE_START,
  CREATE_COURSE_SECTION_SUCCESS,
  CREATE_COURSE_SECTION_FAILURE,
  GET_COURSE_SECTIONS,
  GET_COURSE_SPECIFIC_SECTION,
  UPDATE_COURSE_SECTION_SUCCESS,
  UPDATE_COURSE_SECTION_FAILURE,
  DELETE_COURSE_SECTION_SUCCESS,
  DELETE_COURSE_SECTION_FAILURE,
} from "./actionTypes";
import actionCreator from "./actionCreator";
import { toast } from "react-toastify";

export const createCourse = (newCourse) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionCreator(CREATE_COURSE_START));
    return firestore
      .collection("courses")
      .add(newCourse)
      .then((doc) => {
        const res = newCourse;
        res.id = doc.id;
        return dispatch(actionCreator(CREATE_COURSE_SUCCESS, res));
      })
      .catch((err) => {
        return dispatch(actionCreator(CREATE_COURSE_FAILURE, err));
      });
  };
};

export const getCourses = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionCreator(CREATE_COURSE_START));
    const courses = [];
    return firestore
      .collection("courses")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          const data = doc.data();
          data.id = doc.id;
          courses.push(data);
        });
        return dispatch(actionCreator(GET_COURSE_SUCCESS, courses));
      })
      .catch((err) => {
        return dispatch(actionCreator(CREATE_COURSE_FAILURE, err));
      });
  };
};

export const publishOrUnpublishCourses = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionCreator(CREATE_COURSE_START));
    const course = firestore.collection("courses").doc(data.id);
    data.isPublished = !data.isPublished;
    return course
      .update(data)
      .then((res) => {
        return dispatch(actionCreator(GET_COURSE_SUCCESS, course));
      })
      .catch((err) => {
        return dispatch(actionCreator(CREATE_COURSE_FAILURE, err));
      });
  };
};

export const createCourseSection = (
  courseId,
  section,
  setShow,
  setIsLoading,
  setIsPageRefreshed
) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      const course = firestore.collection("courses").doc(courseId);
      await course.collection("sections").doc().set(section);

      const updatedSectionsSnaps = await course.collection("sections").get();
      let updatedSections = [];
      updatedSectionsSnaps.forEach((updatedSection) =>
        updatedSections.push(updatedSection.data())
      );
      dispatch({
        type: CREATE_COURSE_SECTION_SUCCESS,
        payload: section,
      });

      toast.success("Section created successfully", {
        position: "top-center",
        hideProgressBar: true,
      });
      setIsLoading(false);
      setShow(false);
    } catch (error) {
      dispatch({
        type: CREATE_COURSE_SECTION_FAILURE,
        payload: error,
      });
    }
  };
};

export const getCourseSections = (courseId, setIsLoading) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      const course = firestore.collection("courses").doc(courseId);
      let courseSections = [];
      const snapshot = await course.collection("sections").get();
      snapshot.forEach((doc) => courseSections.push(doc.data()));
      dispatch({
        type: GET_COURSE_SECTIONS,
        payload: courseSections,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("error: ", error);
      setIsLoading(false);
    }
  };
};

export const getCourseSectionByName = (courseId, sectionName) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    try {
      const firestore = getFirestore();
      const course = firestore.collection("courses").doc(courseId);
      const sectionSnapshot = await course
        .collection("sections")
        .where("sectionName", "==", `${sectionName}`)
        .get();
      let sectionData;
      sectionSnapshot.forEach((doc) => {
        sectionData = doc.data();
        sectionData.id = doc.id;
      });
      dispatch({
        type: GET_COURSE_SPECIFIC_SECTION,
        payload: sectionData,
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };
};
export const updateCourseSection = (
  courseId,
  sectionId,
  updates,
  setShow,
  setIsLoading
) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    try {
      const firestore = getFirestore();
      const course = firestore.collection("courses").doc(courseId);
      const sectionDoc = await course.collection("sections").doc(sectionId);
      await sectionDoc.update(updates);
      toast.success("Section updated successfully", {
        position: "top-center",
        hideProgressBar: true,
      });
      dispatch({
        type: UPDATE_COURSE_SECTION_SUCCESS,
        payload: updates,
      });
      setShow(false);
      setIsLoading(false);
    } catch (error) {
      dispatch({
        type: UPDATE_COURSE_SECTION_FAILURE,
        payload: error,
      });
    }
  };
};

export const deleteCourseSection = (courseId, sectionId) => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    try {
      const firestore = getFirestore();
      const course = firestore.collection("courses").doc(courseId);
      const sectionDoc = await course.collection("sections").doc(sectionId);
      const deleted = await sectionDoc.delete();
      console.log("deleted: ", deleted);

      toast.success("Section deleted successfully", {
        position: "top-center",
        hideProgressBar: true,
      });
      dispatch({
        type: DELETE_COURSE_SECTION_SUCCESS,
        payload: 'section deleted with success',
      });
    } catch (error) {
      console.log("error : ", error);

    }
  };
};
