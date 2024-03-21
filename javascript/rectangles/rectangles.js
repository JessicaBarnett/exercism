const testAscii = [
  '+---+--+----+',
  '|   +--+----+',
  '+---+--+    |',
  '|   +--+----+',
  '+---+--+--+-+',
  '+---+--+--+-+',
  '+------+  | |',
  '          +-+',
]; // 60 rectangles

// Formatting
// 1. split string into array by newlines (not needed b/c they're passing in arrays of rows)
// 2. split characters into elements by character
const asciiRowsToMatrix = (asciiRows) => {
  return asciiRows.map(row => row.split(''));
}

// Boolean checks
const isCorner = (char) => char === '+';

const hasBottomEdgeAtRow = (asciiMatrix, col1, col2, row) => {
  return asciiMatrix[row][col1] === '+' && asciiMatrix[row][col2] == '+';
}

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
        if (hasBottomEdgeAtRow(asciiMatrix, originCol, siblingCol, row)) {
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

// console.log(countRectanglesInMatrix(testAscii));

/**
 *
 * @param {*} asciiRows array where each element is a row of an ascii drawing
 */
export function count(asciiRows) {
  return countRectanglesInMatrix(asciiRows);
}
