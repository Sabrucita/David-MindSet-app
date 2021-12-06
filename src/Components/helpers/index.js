export const capitalize = (str) => {
  const words = str.split(' ');
  words.forEach((word, i) => {
    words[i] = word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
  });
  return words.join(' ');
};

export const removeLastChar = (str) => str.substr(0, str.length - 1);
export const fixCompaniesTitle = (str) => str.substr(0, str.length - 3) + 'y';
