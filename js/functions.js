function checkStringLength(str, maxLength) {
  return str.length <= maxLength;
}
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

console.log(checkPalindrome('топор'));
