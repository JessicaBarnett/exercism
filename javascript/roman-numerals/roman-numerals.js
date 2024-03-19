// place idx (P)
// numeral indices (N) = P * 2 -> [ N, N+1, N+2 ]
// digit (D)  >= 5?
// less than?  call convert w/ D, N, N+1
// greater than?  call convert D, N+1, N+2

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
    return numerals[2].concat('-'.repeat(digit-5).split('').map(() => numerals[0]).join(''))
  } else if ( digit === 5 ) {
    return numerals[1];
  } else if (digit === 4) {
    return `${numerals[0]}${numerals[1]}`;
  } else if (digit === 9) {
    return `${numerals[0]}${numerals[2]}`;
  }
}

const toRoman = (number) => {
  // numToArray(number).map((digit, placeIdx) => numeralsForDigit(digit, numeralOptsForPlaceIdx(placeIdx)))
};


const test = () => {
  // console.log(`numAsArray: ${numToArray(number)}`)
  [1,10,100,1000].map((p, i) => console.log(`${p}s: ${numeralOptsForPlaceIdx(i)}`));
  [1,2,3,4,5,6,7,8,9].map((d, i) => console.log(`${d} (${d}): ${numeralsForDigit(d, ['I','V','X'])}`));
  [1,2,3,4,5,6,7,8,9].map((d, i) => console.log(`${d}0 (${d}): ${numeralsForDigit(d, ['X','L','C'])}`));
  [1,2,3,4,5,6,7,8,9].map((d, i) => console.log(`${d}00 (${d}): ${numeralsForDigit(d, ['C','D','M'])}`));
  [1,2,3].map((d, i) => console.log(`${d}000 (${d}): ${numeralsForDigit(d, ['M'])}`));
}

test();