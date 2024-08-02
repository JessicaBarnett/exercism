//*****  GETTERS/CONVERTERS  *****//

/**
 * @param {string[]} asciiRows
 * @returns {string[]}
 * @desc splits characters into elements by character
 */
const asciiRowsToMatrix = (asciiRows) => {
  return asciiRows.map(row => row.split(''));
}

/**
 * @param {string[]} asciiMatrix array of arrays of single characters
 * @param {number} col1 column index of a rectangle's left edge
 * @param {number} col2 column index of a rectangle's right edge
 * @param {number} row row index of a rectangle's top edge
 * @returns {string[]}
 * @desc separates out and returns the chars between col1 & col2 at row.
 */
const getCharsForHorizontalEdge = (asciiMatrix, col1, col2, row) => {
  return asciiMatrix[row].slice(col1, col2+1); // returns array of chars
}

/**
 * @param {string[]} asciiMatrix array of arrays of single characters
 * @param {number} col column index of a rectangle's edge
 * @param {number} row1 row index of a rectangle's top edge
 * @param {number} row2 row index of a rectangle's bottom edge
* @returns {string[]}
 * @desc separates out and returns array of chars between row1 & row2 at col
 */
const getCharsForVerticalEdge = (asciiMatrix, col, row1, row2) => {
  const result = [];
  for (let r = row1; r <= row2; r++) {
    result.push(asciiMatrix[r][col]);
  }
  return result;
}

//*****  BOOLEAN CHECKS  *****//

/**
 * @param {string} char
 * @returns {Boolean}
 * @desc checks a character to see if its a corner (+)
 */
const isCorner = (char) => char === '+';

/**
 * @param {number} rowChars array of single-character strings representing the edge of a rectangle
 * @returns {Boolean}
 * @desc Returns true if chars in rowChars match the pattern: +-----+ w/ any number of, or 0, dashes
 */
const isCompleteRow = (rowChars) => rowChars.join('').match(/^\+[-,+]*\+$/) !== null;

/**
 * @param {number} colChars array of single-character strings representing the edge of a rectangle
 * @returns {Boolean}
 * @desc Returns true if chars in colChars match the pattern: +|||+ w/ any number of, or 0, pipes
 */
const isCompleteCol = (colChars) => colChars.join('').match(/^\+[\|,+]*\+$/) !== null;

/**
 * @param {string[]} asciiMatrix array of arrays of single characters
 * @param {number} col1 column index of a rectangle's left edge
 * @param {number} col2 column index of a rectangle's right edge
 * @param {number} row1 row index of a rectangle's top edge
 * @param {number} row2 row index of a rectangle's bottom edge
* @returns {Boolean}
 * @desc Returns true if all 4 edges are complete
 */
const isCompleteSquare = (asciiMatrix, col1, col2, row1, row2) => {
  return isCompleteRow(getCharsForHorizontalEdge(asciiMatrix, col1, col2, row1)) &&
    isCompleteRow(getCharsForHorizontalEdge(asciiMatrix, col1, col2, row2)) &&
    isCompleteCol(getCharsForVerticalEdge(asciiMatrix, col1, row1, row2)) &&
    isCompleteCol(getCharsForVerticalEdge(asciiMatrix, col2, row1, row2));
}

//*****  LOGIC  *****//


// Logic
// for each + in graph
//    for each sibling + to right in same row
//      for each row below
//        is there a + in both column indexes?
//          yes -> add rectangle
//          no  -> continue
const countRectanglesForCorner = (asciiMatrix, originRow, originCol) => {
  let cornerRectangles = 0;

  // iterate each sibling to the right
  for (let siblingCol = originCol+1; siblingCol < asciiMatrix[0].length; siblingCol++) {
    // we only care about corners
    if (isCorner(asciiMatrix[originRow][siblingCol])) {
      // iterate rows below
      for (let row = originRow+1; row < asciiMatrix.length; row++) {
        // if the origin and sibling columns both have a `+` in the current row...
        // debug(asciiMatrix, originCol, siblingCol, originRow, row)
        if (isCompleteSquare(asciiMatrix, originCol, siblingCol, originRow, row)) {
          // add a rectanlge
          cornerRectangles += 1;
        }
      }
    }
  }

  return cornerRectangles;
}

const countRectanglesInMatrix = (asciiRows) => {
  const asciiMatrix = asciiRowsToMatrix(asciiRows);
  let matrixRectangles = 0;

  for (let row = 0; row < asciiMatrix.length; row++) {
    for (let col = 0; col < asciiMatrix[0].length; col++) {
      if (isCorner(asciiMatrix[row][col])) {
        matrixRectangles += countRectanglesForCorner(asciiMatrix, row, col);
      }
    }
  }

  return matrixRectangles;
}

/**
 *
 * @param {*} asciiRows array where each element is a row of an ascii drawing
 */
export function count(asciiRows) {
  return countRectanglesInMatrix(asciiRows);
}

/** DEBUG **/

function debug (asciiMatrix, col1, col2, row1, row2, res) {
  const topEdge = getCharsForHorizontalEdge(asciiMatrix, col1, col2, row1),
        bottomEdge = getCharsForHorizontalEdge(asciiMatrix, col1, col2, row2),
        leftEdge = getCharsForVerticalEdge(asciiMatrix, col1, row1, row2),
        rightEdge = getCharsForVerticalEdge(asciiMatrix, col2, row1, row2);

  console.log(`
Matrix:
${asciiMatrix.map(r => r.join('')).join('\n')}
points: (${row1}, ${col1}) / (${row2}, ${col2})
${isCompleteSquare(asciiMatrix, col1, col2, row1, row2) ? 'IS NOT a square' : 'IS a square'}
topEdge:
isComplete: ${isCompleteRow(topEdge)}
characters: "${topEdge.join('')}"
bottomEdge:
isComplete: ${isCompleteRow(bottomEdge)}
characters: "${bottomEdge.join('')}"
leftEdge:
isComplete: ${isCompleteCol(leftEdge)}
characters: "${leftEdge.join('')}"
rightEdge:
isComplete: ${isCompleteCol(rightEdge)}
characters: "${rightEdge.join('')}"
`);
}