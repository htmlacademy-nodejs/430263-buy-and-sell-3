'use strict';

module.exports.shuffle = (array) => {
  const result = [...array];

  for (let i = array.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);

    [result[i], result[randomPosition]] = [result[randomPosition], result[i]];
  }

  return result;
};
