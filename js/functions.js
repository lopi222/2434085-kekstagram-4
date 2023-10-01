// eslint-disable-next-line no-unused-vars
function checkStringLength(str, maxLength) {
  if (str.length <= maxLength) {
    return true;
  } else {
    return false;
  }
}
// eslint-disable-next-line no-unused-vars
const proverka = checkStringLength('проверяемая строка', 20);
// eslint-disable-next-line no-console
console.log(proverka);

function checkPalindrome(str) {
  const cleanedStr = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedStr = cleanedStr.split('').reverse().join('');

  if (cleanedStr === reversedStr) {
    return true;
  } else {
    return false;
  }
}

const myString = 'А роза упала на лапу Азора';
const isPalindrome = checkPalindrome(myString);

// eslint-disable-next-line no-console
console.log(isPalindrome);
