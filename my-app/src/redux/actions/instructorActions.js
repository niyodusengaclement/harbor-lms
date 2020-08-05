import { SEND_INVITATIONS,SEND_INVITATIONS_ERROR } from "./actionTypes";
import actionCreator from "./actionCreator";
import { toast } from "react-toastify";

export const sendInvitations = (section, course, members) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    
    const firestore = getFirestore();
    await members.forEach( async (member) => {
      const data = {
        receiver: member.id,
        type: "invitation",
        message: `You are invited to enroll in ${course}, section ${section}`,
        status: "pending",
        unread: true,
      }
      return await firestore
      .collection("notifications")
      .add(data)
      .then((doc) => {
          const res = data;
          res.id = doc.id;
          return dispatch(actionCreator(SEND_INVITATIONS, res));
      })
      .catch((err) => {
        toast.error(err, {
          position: "top-center",
          hideProgressBar: true,
        });
        return dispatch(actionCreator(SEND_INVITATIONS_ERROR, err));
      });
    });
  }
};
