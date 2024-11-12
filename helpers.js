/*
 * Cormac Taylor
 * I pledge my honor that I have abided by the Stevens Honor System.
 */
const isInvalidString = (str) => {
  return typeof str !== "string" || str.trim().length == 0;
};

const isInvalidID = (ID) => {
  if (ID.length < 3 || ID[0] !== "t" || ID[1] !== "t")
    return true;
  const strNum = ID.substring(2);
  if (!strNum || isNaN(strNum))
    return true;
  const num = Number(strNum)
  return !Number.isInteger(num) || num < 0;
};

export { isInvalidString, isInvalidID };