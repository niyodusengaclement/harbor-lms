import { getCharsBeforeIndex, getCharsAfterIndex } from "./utils";
import randomize from 'randomatic';

export default (calendarSystem, semOrTrimNumber, startingYear, closingYear) => {
  const firstLetterOfCalendarSystem = getCharsBeforeIndex(1)(
    calendarSystem
  ).toUpperCase();
  const startingYearLastTwoDigits = getCharsAfterIndex(2)(startingYear);
  const closingYearLastTwoDigits = getCharsAfterIndex(2)(closingYear);
  let idPart1, idPart2;

  if (startingYear === closingYear)
    idPart1 = `${firstLetterOfCalendarSystem}${semOrTrimNumber}${startingYearLastTwoDigits}`;
  else
  idPart1 = `${firstLetterOfCalendarSystem}${semOrTrimNumber}${startingYearLastTwoDigits}${closingYearLastTwoDigits}`;
    idPart2 = randomize('A0a',5);
    return `${idPart1}-${idPart2}`
};