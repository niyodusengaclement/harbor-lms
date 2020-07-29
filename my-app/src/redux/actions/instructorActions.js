import { SEND_INVITATIONS,SEND_INVITATIONS_ERROR } from "./actionTypes";

export const sendInvitations = (sender, course, members) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
  try {
      const firestore = getFirestore();

      members.forEach(async (member) => {
        let invitations = await firestore.collection("notifications").doc();
        await invitations.set({
          sender,
          receiver: member,
          type: "invite",
          message: `${sender} invited you to enroll in ${course}`,
          status: "pending",
        });
        const snapshot = await firestore
          .collection("users")
          .where("fullName", "==", member)
          .get();
        let userDocumentId;
        snapshot.forEach((snap) => (userDocumentId = snap.id));
        await firestore
          .collection("users")
          .doc(userDocumentId)
          .collection("invitations")
          .doc()
          .set({
            invitationId: invitations.id,
            message: `${sender} invited you to enroll in ${course}`,
            read: false,
          });
      });
      dispatch({
        type: SEND_INVITATIONS,
        payload: members,
      });
    } catch (error) {
      dispatch({
        type: SEND_INVITATIONS_ERROR,
        error,
      });
    };
  }
};
