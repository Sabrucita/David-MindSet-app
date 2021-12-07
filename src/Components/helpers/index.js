export const capitalize = (str) => {
  const words = str.split(' ');
  words.forEach((word, i) => {
    words[i] = word.substr(0, 1).toUpperCase() + word.substr(1).toLowerCase();
  });
  return words.join(' ');
};

export const removeLastChar = (str) => str.substr(0, str.length - 1);

export const formatDate = (element, fullDate = true) => {
  let dateLong = new Date(element);
  dateLong.setDate(dateLong.getDate());
  let hours = dateLong.getHours();
  if (hours < 10) hours = `0${hours}`;
  let minutes = dateLong.getMinutes();
  if (minutes < 10) minutes = `0${minutes}`;
  let dateShort;
  if (fullDate === true) {
    dateShort = `${dateLong.getDate()} / ${
      dateLong.getMonth() + 1
    } / ${dateLong.getFullYear()} ${hours}:${minutes}hs`;
  } else {
    dateShort = `${dateLong.getDate()} / ${dateLong.getMonth() + 1} / ${dateLong.getFullYear()}`;
  }
  return dateShort;
};
