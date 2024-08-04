const getCharsForHorizontalEdge = (asciiMatrix, col1, col2, row) => {
  return asciiMatrix[row].slice(col1, col2+1); // returns array of chars
}

const getCharsForVerticalEdge = (asciiMatrix, col, row1, row2) => {
  const result = [];
  for (let r = row1; r <= row2; r++) {
    result.push(asciiMatrix[r][col]);
  }
  return result;
}

const isCorner = (char) => char === '+';
const isCompleteRow = (rowChars) => rowChars.join('').match(/^\+[-,+]*\+$/) !== null;
const isCompleteCol = (colChars) => colChars.join('').match(/^\+[\|,+]*\+$/) !== null;

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
//          Are all edges complete?
//            yes -> add rectangle
//            no  -> continue
const countRectanglesForCorner = (asciiMatrix, originRow, originCol) => {
  let cornerRectangles = 0;

  // iterate each sibling to the right
  for (let siblingCol = originCol+1; siblingCol < asciiMatrix[0].length; siblingCol++) {
    // we only care about corners
    if (isCorner(asciiMatrix[originRow][siblingCol])) {
      // iterate rows below corner / look for other corners
      for (let row = originRow+1; row < asciiMatrix.length; row++) {
        // if the origin and sibling columns both have a `+` in the current row...
        if (isCompleteSquare(asciiMatrix, originCol, siblingCol, originRow, row)) {
          // then add a rectanlge
          cornerRectangles += 1;
        }
      }
    }
  }

  return cornerRectangles;
}

const countRectanglesInMatrix = (asciiRows) => {
  const asciiMatrix = asciiRows.map(row => row.split(''));
  let matrixRectangles = 0;

  // Iterate through all characters in matrix
  // If a corner (+) is found, count its rectangles
  for (let row = 0; row < asciiMatrix.length; row++) {
    for (let col = 0; col < asciiMatrix[0].length; col++) {
      if (isCorner(asciiMatrix[row][col])) {
        matrixRectangles += countRectanglesForCorner(asciiMatrix, row, col);
      }
    }
  }

  return matrixRectangles;
}

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