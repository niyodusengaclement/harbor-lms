import { toast } from 'react-toastify';
import { CHAT_ACTION_START, GET_CHAT_SUCCESS, SAVE_CHAT_SUCCESS, CHAT_ACTION_FAILED } from "./actionTypes";
import actionCreator from "./actionCreator";

export const saveChat = (newChat) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(actionCreator(CHAT_ACTION_START));
    return firestore
          .collection("chats")
          .add(newChat)
          .then((doc)=>{
              const res = newChat;
              res.id = doc.id;
              return dispatch(actionCreator(SAVE_CHAT_SUCCESS, res));
          })
          .catch((err) => {
            toast.error('Something went wrong', {
              position: "top-center",
              hideProgressBar: true,
            });
            return dispatch(actionCreator(CHAT_ACTION_FAILED, err));
      });
  };
};

export const getChats = (sectionId) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      dispatch(actionCreator(CHAT_ACTION_START));
      const chats = [];
      const ref = firestore.collection("chats");
      const allChats = await ref.where('section', '==', sectionId).get();
      if(allChats.empty) {
        return dispatch(actionCreator(GET_CHAT_SUCCESS, []));
      }
      allChats.forEach((doc) => {
        const data = doc.data()
        data.id = doc.id;
        chats.push(data)
      });
      return dispatch(actionCreator(GET_CHAT_SUCCESS, chats));
    } catch (err) {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
      return dispatch(actionCreator(CHAT_ACTION_FAILED, err));
    }
  };
};
