export const capitalize = (str) => {
  const words = str.split(' ');
  words.forEach((word, i) => {
    words[i] = word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
  });
  return words.join(' ');
};
