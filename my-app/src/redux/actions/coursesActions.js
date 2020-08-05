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
  UPDATE_COURSE_MEMBERS,
  GET_COURSE_MEMBERS,
  GET_COURSE_MEMBERS_ERROR,
  ACTION_START

} from "./actionTypes";
import actionCreator from "./actionCreator";
import { toast } from "react-toastify";
import { getProfile } from "../../helpers/utils";

export const createCourse = (newCourse) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionCreator(CREATE_COURSE_START));
    return firestore
          .collection("courses")
          .add(newCourse)
          .then((doc)=>{
              const res = newCourse;
              res.id = doc.id;
              toast.success('Course created successfully', {
                position: "top-center",
                hideProgressBar: true,
              });
              return dispatch(actionCreator(CREATE_COURSE_SUCCESS, res));
          })
          .catch((err) => {
            toast.error(err, {
              position: "top-center",
              hideProgressBar: true,
            });
            return dispatch(actionCreator(CREATE_COURSE_FAILURE, err));
      });
  };
};

export const getCourses = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const { uid } = getProfile();
      const firestore = getFirestore();
      dispatch(actionCreator(CREATE_COURSE_START));
      const courses = [];
      const courseRef = firestore.collection("courses");
      const crs = await courseRef.where('instructorId', '==', uid).get();
      if(crs.empty) {
        return dispatch(actionCreator(GET_COURSE_SUCCESS, []));
      }
      crs.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        courses.push(data)
      });
      return dispatch(actionCreator(GET_COURSE_SUCCESS, courses));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(CREATE_COURSE_FAILURE, err));
    }
  };
};

export const publishOrUnpublishCourses = (data) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const course = firestore.collection("courses").doc(data.id);
    data.isPublished = !data.isPublished
    return course.update(data)
    .then((res)=>{
      toast.success(`Course ${data.isPublished ? 'published' : 'unpublished'} successfully`, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(GET_COURSE_SUCCESS, course));
    })
    .catch((err) => {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
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

export const updateCourseMembers = (courseId, arrayOfMembers) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const course = firestore.collection("courses").doc(courseId);
    arrayOfMembers.forEach(async (member) => {
      course
      .collection("members")
      .add(member)
      .then(() => {
          return dispatch(actionCreator(UPDATE_COURSE_MEMBERS, arrayOfMembers));
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-center",
          hideProgressBar: true,
        });
        return dispatch(actionCreator(GET_COURSE_MEMBERS_ERROR, err));
      });
    });
  };
};

export const getCourseMembers = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(actionCreator(ACTION_START));
      const firestore = getFirestore();
      dispatch(actionCreator(CREATE_COURSE_START));
      const allMembers = [];
      const courseRef = firestore.collection("courses").doc(localStorage.getItem('courseId'));

      const crs = await courseRef.collection("members").get();
      if(crs.empty) {
        return dispatch(actionCreator(GET_COURSE_MEMBERS, []));
      }
      crs.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        allMembers.push(data)
      });
      return dispatch(actionCreator(GET_COURSE_MEMBERS, allMembers));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(GET_COURSE_MEMBERS_ERROR, err));
    }
  };
};
