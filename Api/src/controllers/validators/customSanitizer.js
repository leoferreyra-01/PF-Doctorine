'use strict';

function formatName(value) {
  const splitValue = value.split(' ');
  let newSplitValue = [];

  for (let i = 0; i < splitValue.length; i++) {
    const word = splitValue[i];
    const firstLetter = word.slice(0, 1);
    const restLetters = word.slice(1);

    splitValue[i] = firstLetter.toUpperCase() + restLetters.toLowerCase();

    newSplitValue.push(splitValue[i]);
  }

  return newSplitValue.join(' ');
}

module.exports = {
  formatName,
};
