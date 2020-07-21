const nonEmptyArrayEntries = (obj) => {
  return Object.entries(obj).filter((entry) => {
    const objectValueConvertedToStr = `${entry[1]}`
    return (
      objectValueConvertedToStr !== null &&
      objectValueConvertedToStr !== undefined &&
      objectValueConvertedToStr.length !== 0
    );
  });
};
const createEntry = (key, value) => {
  return { [key]: value };
};
const addEntry = (entries, entry) => {
  let newEntries = { ...entries, ...entry };
  return newEntries;
};

const convertBackToObject = (arr) => {
  let entries = {};
  let entry = {};
  let key, value;
  const flattenArray = arr.flat();
  for (let index = 0; index <= flattenArray.length; index++) {
    if (index % 2 === 0) {
      key = flattenArray[index];
      value = flattenArray[index + 1];
      if (key === undefined) break;
      entry = createEntry(key, value);
      entries = addEntry(entries, entry);
    }
  }
  return entries;
};

export default (object) => {
  const arrayEntries = nonEmptyArrayEntries(object);
  return convertBackToObject(arrayEntries);
};
