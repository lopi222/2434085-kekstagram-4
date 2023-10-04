// eslint-disable-next-line no-unused-vars
function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}
// eslint-disable-next-line no-console
console.log(checkStringLength('проверяемая строка'));

function checkPalindrome(str) {
  // Удаляем все пробелы и приводим строку к нижнему регистру
  str = str.replace(/\s/g, '').toLowerCase();
  const reversedStr = str.split('').reverse().join('');

  // Сравниваем исходную строку с перевернутой
  if  (str === reversedStr)
  {
    return true;
  }
  return false;
}

// eslint-disable-next-line no-console
console.log(checkPalindrome('топор'));
