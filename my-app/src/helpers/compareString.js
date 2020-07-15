export default (string1, string2) => {
  return (string1 && string2) ? string1.toLowerCase() === string2.toLowerCase() : null;
};
