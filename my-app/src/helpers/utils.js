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
