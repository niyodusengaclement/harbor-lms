import React from 'react';
import actionCreator from "./actionCreator";
import { toast } from "react-toastify";

export const markAsRead = (data, isRead) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const ref = firestore.collection("notifications").doc(data.id);
    let { unread } = data;
    unread = isRead ? false : !unread;
    return ref.update({
      unread,
    })
    .then()
    .catch((err) => {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
    });
  };
};


export const acceptOrRejectInvitation = (data, action) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const ref = firestore.collection("members").doc(data.docId);
    const notificationRef = firestore.collection("notifications").doc(data.id);
    ref.update({
      status: action,
    })
    notificationRef.update({
      status: action,
    })
    .then(() => {
      toast.success(`Invitation ${action} successfully`, {
        position: 'top-center',
        hideProgressBar: true,
      });
    })
    .catch((err) => {
      toast.error(err, {
        position: "top-center",
        hideProgressBar: true,
      });
    });
  };
};
