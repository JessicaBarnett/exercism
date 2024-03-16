/*
  Thoughts

  Could use the song text to generate structured data?
  but the rules ALWAYS have exceptions.
    they all have an animal at th rnf og yhr line except for spider and fly.
    they all have tqo lines except for spider
    some of the 2nd lines are "and swallowed" while others are "to swallow"
    etc

  Could use a regex to catch all versions? but gotta grab the last instance in each line tho...

    Should match the following.  Capturing group 4 is ANIMAL
        swallowed a ANIMAL.
        swallowed a ANIMAL!
        swallow a ANIMAL.
        catch the ANIMAL.
        catch a ANIMAL. // unneeded
    const ANIMAL_REGEX = /(catch|swallow(ed)?)\s(a|the)\s(\S*)(!|.)/;
    const getAnimalFromLine = (line) => ANIMAL_REGEX.exec(line)[4];

    But this catches both animals in one line...

  am I overcomplicating?

  Could do a linked list and recurse down, with the fly at the bottom
  ...but then I need to add the horse if I get all the way to the bottom.  Another edge case

  ...honest I see no point in doing this algorithimically.  The rules are so specific it may as well
  just be hard coded.  It's not like this will EVER be reused.


  first line: unique animal
  second line: animal detail

  animal bridge until animal is fly
  animal detail

  if this is complete song:
  animal bridge and detail for horse


  different line templates:
    first line:
      I know an old lady who swallowed a ANIMAL.foo

    second line:
      ANIMAL_DETAIL (slightly diff for spider)

    middle line:
      She swallowed the PREV_ANIMAL to catch the CURR_ANIMAL

    second line:
      ANIMAL_DETAIL (FLY)

    When there are 7 verses, there are 2 more lines
      middle line:
        I know an old lady who swallowed a horse.

      last line:
        ANIMAL_DETAIL (HORSE)


  I'm annoyed that I'm still working on this...  ughhhhhh....
 */


const ANIMALS = [
  ['fly', 'I don\'t know why she swallowed the fly. Perhaps she\'ll die.'],
  ['spider', 'wriggled and jiggled and tickled inside her.'], // the only verse without the animal in the 2nd line
  ['bird', 'How absurd to swallow a bird!'],
  ['cat', 'Imagine that, to swallow a cat!'],
  ['dog', 'What a hog, to swallow a dog!'],
  ['goat', 'Just opened her throat and swallowed a goat!'],
  ['cow', 'I don\'t know how she swallowed a cow!'],
  ['horse', 'She\'s dead, of course!'],
];

const animalFirst = (line) => {
  return `I know an old lady who swallowed a ${line[0]}.`;
}

const animalDetail = (line) => {
  if (line[0] === 'spider') {
    return `It ${line[1]}`
  }
  return line[1];
}

const animalBridge = (line, prevLine) => {
  const prevAnimal = prevLine[0];
  const currAnimal = line[0];
  if (currAnimal === 'spider') {
    return `She swallowed the ${prevAnimal} to catch the ${currAnimal} that ${line[1]}`;
  }
  return `She swallowed the ${prevAnimal} to catch the ${currAnimal}.`;
}

const verse = (verseNum) => {
  const lines = [];
  let lineIdx = verseNum-1;

  lines.push(animalFirst(ANIMALS[lineIdx])); // I know an old lady who swallowed a ___
  lines.push(animalDetail(ANIMALS[lineIdx])); // Imagine that, to swallow a ___ !

  if (verseNum !== 8 && verseNum !== 1) { // skip if this is the horse or fly line
      for (let i = lineIdx - 1; i >= 0; i--) {
        lines.push(animalBridge(ANIMALS[i], ANIMALS[i+1]));
      }
      lines.push(animalDetail(ANIMALS[0]))
  }

  // console.log(`verseNum: ${verseNum}\nAnimal: ${ANIMALS[lineIdx][0]}\n${lines.join('\n')}`)
  return lines.join('\n').concat('\n');
}

const verses = (startVerse, endVerse) => {
  const verses = [];

  for (let i = startVerse; i <= endVerse; i++) {
    verses.push(verse(i));
  }
  return verses.join('\n').concat('\n');
}

export class Song {
  verse(verseNum) {
    return verse(verseNum);
  }

  verses(startVerse, endVerse) {
    return verses(startVerse, endVerse);
  }
}
