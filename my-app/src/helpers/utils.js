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

export const addElementToEachObjectInArr = (arr, newElement) => {
  return arr.map((obj) => {
    return { ...obj, ...newElement };
  });
};

export const findObjFromArr = (arrOfAllMembers, namesOfMembers) => {
  console.log("arrOfAllMembers: ", { ...arrOfAllMembers });
  return namesOfMembers.map((name) => {
    return arrOfAllMembers.find((memberObj) => memberObj.fullName === name);
  });
};

export const getSomeFieldsOfObjects = (arrOfObjects, arrayOfWantedFields) => {
  let newObj = {};
  const desiredObj = arrOfObjects && arrOfObjects.length > 0 ? arrOfObjects.map((obj) => {
    arrayOfWantedFields.forEach((field) => {
      let temp = {};
      temp[field] = obj[field] || obj.email;
      newObj = { ...newObj, ...temp };
    });
    console.log('newObj : ', newObj);
    return newObj;
  }):  [];
  return desiredObj;
};