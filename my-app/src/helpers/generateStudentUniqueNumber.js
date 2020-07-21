const generateStudentUniqueNumber = (currentStudentCounts) => {
  const thisYearLast2Values = getCharsAfterIndex(2)(getThisYear);
  if (!currentStudentCounts) {
    return parseInt(`${thisYearLast2Values}0`);
  } else {
    return parseInt(
      `${thisYearLast2Values}${parseInt(currentStudentCounts) + 1}`
    );
  }
};
export const getCharsAfterIndex = (index) => {
  return (input) => {
    const stringifiedInput = `${input}`;
    return stringifiedInput.slice(index);
  };
};
export const getCharsBeforeIndex = (index) => {
  return (input) => {
    const stringifiedInput = `${input}`;
    return stringifiedInput.slice(0, index);
  };
};

export const getThisYear = new Date().getFullYear();

export default generateStudentUniqueNumber;
