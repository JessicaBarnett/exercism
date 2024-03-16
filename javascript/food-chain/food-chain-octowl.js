// I copied this solution over so I could compare.  I like this a lot better
// https://exercism.org/tracks/javascript/exercises/food-chain/solutions/Octowl
export class Song {
    static animals = [
      "fly",
      "spider",
      "bird",
      "cat",
      "dog",
      "goat",
      "cow",
      "horse",
    ];

    static incredulity = [
      "I don't know why she swallowed the fly. Perhaps she'll die.\n",
      "It wriggled and jiggled and tickled inside her.\n",
      "How absurd to swallow a bird!\n",
      "Imagine that, to swallow a cat!\n",
      "What a hog, to swallow a dog!\n",
      "Just opened her throat and swallowed a goat!\n",
      "I don't know how she swallowed a cow!\n",
      "She's dead, of course!\n",
    ];

    reason(num, lines = "") {
      return !num
        ? lines
        : lines +
            `She swallowed the ${Song.animals[num]} to catch the ${
              Song.animals[num - 1]
            }${
              num === 2 ? " that wriggled and jiggled and tickled inside her" : ""
            }.\n` +
            this.reason(num - 1, lines);
    }

    verse(num) {
      num--;
      const firstLine = `I know an old lady who swallowed a ${Song.animals[num]}.\n`;
      const secondLine = Song.incredulity[num];
      const deathLine = Song.incredulity[0];
      const reason = this.reason(num);

      return `${firstLine}${secondLine}${
        num === 0 || num === 7 ? "" : reason + deathLine
      }`;
    }

    verses(start, end) {
      return Array.from(
        { length: end - start + 1 },
        (_, i) => this.verse(i + 1) + "\n"
      ).join``;
    }
  }
