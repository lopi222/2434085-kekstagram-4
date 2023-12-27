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


// eslint-disable-next-line no-unused-vars
function checkMeetingTime(startWorkTime, endWorkTime, startMeetingTime, meetingDuration) {
  // Преобразуем время встречи и рабочего дня в минуты
  const [startWorkHour, startWorkMinute] = startWorkTime.split(':').map(Number);
  const [endWorkHour, endWorkMinute] = endWorkTime.split(':').map(Number);
  const [startMeetingHour, startMeetingMinute] = startMeetingTime.split(':').map(Number);
  // eslint-disable-next-line no-unused-vars
  const startWorkMinutes = startWorkHour * 60 + startWorkMinute;
  const endWorkMinutes = endWorkHour * 60 + endWorkMinute;
  const startMeetingMinutes = startMeetingHour * 60 + startMeetingMinute;

  // Рассчитываем время окончания встречи в минутах
  const endMeetingMinutes = startMeetingMinutes + meetingDuration;

  // Проверяем, не выходит ли время окончания встречи за пределы рабочего дня
  if (endMeetingMinutes <= endWorkMinutes) {
    return true;
  } else {
    return false;
  }
}
// eslint-disable-next-line
console.log(checkMeetingTime('8:0', '10:0', '8:0', 120));
