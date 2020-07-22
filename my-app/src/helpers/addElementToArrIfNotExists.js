export default (existingArr,newElement) => {
    if(existingArr.includes(newElement)) return existingArr;
    else return [...existingArr,newElement];
  }