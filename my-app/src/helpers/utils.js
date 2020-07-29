export const getCharsAfterIndex = (index) => {
  return (input) => {
    const stringifiedInput = `${input}`;
    return stringifiedInput.slice(index);
  };
};
export const getCharsBeforeIndex = (index) => {
  return (input) => {
    const stringifiedInput = `${input}`;
    return stringifiedInput.slice(0, index).trim();
  };
};

export const updateArrOfObj = (arr, obj) => {
  return arr.map((object) => {
    if (object.id === obj.id) return obj;
    else return object;
  });
};

export const getProfile = () => {
  const uid = localStorage.getItem('rems_user_id');
  const profile = JSON.parse(localStorage.getItem('rems_user_profile'));
  return { uid, ...profile }
}