// return a new array of roman numerals
const numerals = () => 'IVXLCDM'.split('')

// convert number to a string, string to array of single characters, characters back to numbers
const numToArray = (num) => (num+'').split('').map((str) => +str);

// given idx of the number being converted (ie, 1s digit is 0, 10s digit is 1, 100s digit is 2)
// get the 3 characters that are needed to represent that character.  ex:
// placeIdx 0 (1s digit) -> ['I', 'V', 'X']
// placeIdx 1 (10s digit) -> ['X', 'L', 'C']
const numeralOptsForPlaceIdx = (placeIdx) => numerals().splice((placeIdx*2), 3);

const numeralsForDigit = (digit, numerals) => {
  if ([1,2,3].includes(digit)) {
    return '-'.repeat(digit).split('').map(() => numerals[0]).join('')
  } else if ([6,7,8].includes(digit)) {
    return numerals[1].concat('-'.repeat(digit-5).split('').map(() => numerals[0]).join(''))
  } else if ( digit === 5 ) {
    return numerals[1];
  } else if (digit === 4) {
    return `${numerals[0]}${numerals[1]}`;
  } else if (digit === 9) {
    return `${numerals[0]}${numerals[2]}`;
  } else if (digit === 0) {
    return '';
  }
}

const numeralsForNumber = (number) => {
  return numToArray(number) // ex: 3649 -> [3, 6, 4, 9]
    .reverse() // [3, 6, 4, 9] -> [9, 4, 6, 3]
    .map((digit, placeIdx) => numeralsForDigit(digit, numeralOptsForPlaceIdx(placeIdx))) // [9, 4, 6, 3] -> ['IX', 'XL', 'DC', 'MMM']
    .reverse() // ['IX', 'XL', 'DC', 'MMM'] -> ['MMM', 'DC', 'XL', 'IX']
    .join(''); // 'MMMDCXLIX'
}

export const toRoman = (number) => {
  return numeralsForNumber(number)
};

const test = () => {
  [1,10,100,1000].map((p, i) => console.log(`${p}s: ${numeralOptsForPlaceIdx(i)}`));

  [1,2,3,4,5,6,7,8,9].map((d, i) => console.log(`${d} (${d}): ${numeralsForDigit(d, ['I','V','X'])}`));
  [1,2,3,4,5,6,7,8,9].map((d, i) => console.log(`${d}0 (${d}): ${numeralsForDigit(d, ['X','L','C'])}`));
  [1,2,3,4,5,6,7,8,9].map((d, i) => console.log(`${d}00 (${d}): ${numeralsForDigit(d, ['C','D','M'])}`));
  [1,2,3].map((d, i) => console.log(`${d}000 (${d}): ${numeralsForDigit(d, ['M'])}`));

  console.log(`16: ${numeralsForNumber(16)}`)
  console.log(`27: ${numeralsForNumber(27)}`)
  console.log(`66: ${numeralsForNumber(66)}`)
  console.log(`666: ${numeralsForNumber(666)}`)


  console.log(`93: ${numeralsForNumber(93)}`)
  console.log(`163: ${numeralsForNumber(163)}`)
  console.log(`166: ${numeralsForNumber(166)}`)
  console.log(`3000: ${numeralsForNumber(3000)}`)
  console.log(`3649: ${numeralsForNumber(3649)}`)
}

test();
