/**
 * Adds zeroes to the beginning of a number to ensure it's the correct minimum length.
 * Numbers with more digits than length are not modified.
 *
 * @param number Number to pad
 * @param length Number of digits the string should be
 * @returns Formatted number
 */
export function zeroPad(number: number, length: number) {
  const numberStr = number.toString();
  const placeDifference = length - numberStr.length;

  if (placeDifference <= 0) {
    return numberStr;
  }

  // Generate an array of n+1 nothings, and join them with 0, leaving a string of n 0's
  return `${Array(placeDifference + 1).join('0')}${numberStr}`;
}
