// Arrays Solution
const rotateMap = (str, rotation) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const frontOfCipher = alphabet.slice(rotation, alphabet.length);
  const backOfCipher = alphabet.slice(0, rotation);
  const cipherAlphabet = frontOfCipher.concat(backOfCipher);

  const res = str.split('').map((char) => {
    let cipherChar = cipherAlphabet[alphabet.indexOf(char.toLowerCase())];

    if (cipherChar && char.toUpperCase() === char) {
      cipherChar = cipherChar.toUpperCase();
    }
    return cipherChar ?? char;
  })

  return res.join('');
};

/**
  Trying a version using regex instead of arrays, just to see.
   It isn't working because it's replacing the first letter, say
   e with i, and then when it gets to i later, replaces it again.
   I'd need to do all the replacements at once to do it this way...
 */
const rotateReplace = (str, rotation) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
  const frontOfCipher = alphabet.slice(rotation, alphabet.length);
  const backOfCipher = alphabet.slice(0, rotation);
  const cipherAlphabet = frontOfCipher.concat(backOfCipher);
  console.log(cipherAlphabet)

  return cipherAlphabet.reduce((rotatedStr, _, idx) => {
    console.log(`replacing "${alphabet[idx]}" with "${cipherAlphabet[idx]}" in ${rotatedStr}`);
    return rotatedStr
      .replace(new RegExp(alphabet[idx], 'g'), cipherAlphabet[idx])
      .replace(new RegExp(alphabet[idx].toUpperCase(), 'g'), cipherAlphabet[idx].toUpperCase());
  }, str)
};

// Output
export const rotate = (str, rotation) => {
  return rotateMap(str, rotation);
  // return rotateReplace(str, rotation);
};