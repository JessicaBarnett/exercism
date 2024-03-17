const alphabetStr = 'abcdefghijklmnopqrstuvwxyz';
const alphabet = alphabetStr.split('');

const rotate = (str, rotation) => {
  const cipherAlphabet = alphabetStr.slice(rotation, alphabetStr.length).concat(alphabet.slice(0, rotation)).split('');
  return str.split('').map((char) => {
    return cipherAlphabet[alphabet.indexOf(char)];
  });
};
