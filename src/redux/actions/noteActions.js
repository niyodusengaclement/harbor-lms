import { toast } from 'react-toastify';
import { NOTE_ACTION_START, CREATE_NOTE_SUCCESS, NOTE_ACTION_FAILED , GET_NOTE_SUCCESS, DELETE_NOTE_SUCCESS, UPLOADING_NOTE_FILE_START, UPDATE_NOTE_SUCCESS, NOTE_UPLOAD_PROGRESS } from "./actionTypes";
import actionCreator from "./actionCreator";

export const saveNote = (note) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionCreator(NOTE_ACTION_START));
    return firestore
          .collection("notes")
          .add(note)
          .then((doc)=>{
              const res = note;
              res.id = doc.id;
              toast.success('Note added successfully', {
                hideProgressBar: true,
                position: "top-center"
              });
              return dispatch(actionCreator(CREATE_NOTE_SUCCESS, res));
          })
          .catch((err) => {
            toast.error('Something went wrong', {
              position: "top-center",
              hideProgressBar: true,
            });
            return dispatch(actionCreator(NOTE_ACTION_FAILED, err));
      });
  };
};

export const getNotes = (courseId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(NOTE_ACTION_START));
      const notes = [];
      const ref = firestore.collection("notes");
      const allnotes = await ref.where('courseId', '==', courseId).get();
      allnotes.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        notes.push(data)
      });
      return dispatch(actionCreator(GET_NOTE_SUCCESS, notes));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(NOTE_ACTION_FAILED, err));
    }
  };
};

export const deleteNote= (id) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      const ref = firestore.collection("notes").doc(id).delete();
      if(ref) {
        toast.success('Note deleted successfully', {
          position: "top-center",
          hideProgressBar: true,
        });

        return dispatch(actionCreator(DELETE_NOTE_SUCCESS, id));
      }
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(NOTE_ACTION_FAILED, err));
    }
  };
};

export const updateNote= (data) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(NOTE_ACTION_START));
      const assignments = [];
      const assRef = firestore.collection("notes").doc(data.id);
      const update = await assRef.update(data);
        toast.success(`Note updated successfully`, {
          position: "top-center",
          hideProgressBar: true,
        });
        return dispatch(actionCreator(UPDATE_NOTE_SUCCESS, data));
      
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(NOTE_ACTION_FAILED, err));
    }
  };
};

export const uploadNoteFile = (file, note) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    const storagePath = "notes/files";

    dispatch(actionCreator(UPLOADING_NOTE_FILE_START));
    firebase
      .uploadFile(storagePath, file)
      .then(({uploadTaskSnapshot}) => {
        const progress = (uploadTaskSnapshot.bytesTransferred / uploadTaskSnapshot.totalBytes) * 100;
        dispatch(actionCreator(NOTE_UPLOAD_PROGRESS, progress))
        uploadTaskSnapshot.ref.getDownloadURL().then((downloadURL) => {
          note.fileUrl = downloadURL;
          firestore
            .collection("notes")
            .add(note)
            .then((doc)=>{
                const res = note;
                res.id = doc.id;
                dispatch(actionCreator(CREATE_NOTE_SUCCESS, res))
            })
            .catch((err) => {
              toast.error(err, {
                position: "top-center",
                hideProgressBar: true,
              });
              return dispatch(actionCreator(NOTE_ACTION_FAILED, err));
              });
          });
        toast.success('Note file uploaded successfully', {
          position: "top-center",
          hideProgressBar: true,
        });
      })
  };
};
