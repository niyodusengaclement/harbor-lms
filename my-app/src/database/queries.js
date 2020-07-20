import firebase from "../config/firebase";

export const setDocument = async (collectionName, documentName, data) => {
  const collection = firebase.firestore().collection(collectionName);
  return collection
    .doc(documentName)
    .set(data)
    .then(() => true)
    .catch((error) => error);
};
export const getDocument = async (collectionName, documentName) => {
  const collection = firebase.firestore().collection(collectionName);

  return collection
    .doc(documentName)
    .get()
    .then((documentSnapshot) => JSON.stringify(documentSnapshot.data()))
    .catch((error) => error);
};
