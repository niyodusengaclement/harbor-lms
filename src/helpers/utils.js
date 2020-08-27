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

export const getProfile = () => {
  const uid = localStorage.getItem('rems_user_id');
  const profile = JSON.parse(localStorage.getItem('rems_user_profile'));
  return { uid, ...profile }
}

export const autoCapFirstLetter = (string) => {
  return string[0].toUpperCase() + string.slice(1);
}