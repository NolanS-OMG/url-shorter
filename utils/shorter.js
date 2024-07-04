const base62Encode = (num) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';

  if (num === 0) {
    return '0';
  }

  while (num > 0) {
    result = chars[num % 62] + result;
    num = Math.floor(num / 62);
  }

  return result;
}

const base62Decode = (str) => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = 0;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const value = chars.indexOf(char);
    result = result * 62 + value;
  }

  return result;
}

const randomShort = () => {
  const randomNums = [(Math.floor((Math.random()) * 62)), Math.floor((Math.random()) * 62), Math.floor((Math.random()) * 62), Math.floor((Math.random()) * 62), Math.floor((Math.random()) * 62), Math.floor((Math.random()) * 62)];
  for (let i = 0; i < randomNums.length; i++) {
    randomNums.splice(i, 1, base62Encode(randomNums[i]));
  }
  return randomNums.join("");
}

module.exports = { randomShort };