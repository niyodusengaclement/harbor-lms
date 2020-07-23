export const getDateAndTime = (val) => {
  const date = new Date(val);
  const month= date.toDateString().split(' ')[1];
  return `${month} ${date.getDate()}, ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
}