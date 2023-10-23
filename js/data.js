import { getRandomNumber } from './util.js';
// eslint-disable-next-line no-unused-vars
import { descriptions, avatars, messages, names } from './constants.js';

// Функция для генерации массива случайных комментариев
// eslint-disable-next-line no-unused-vars
function generateCommentsArray() {
  const commentsArray = [];
  const numComments = getRandomNumber(0, 30);

  for (let i = 1; i <= numComments; i++) {
    const comment = generateComment();
    commentsArray.push(comment);
  }

  return commentsArray;
}

// Функция для генерации случайного комментария
function generateComment() {
  return {
    id: getRandomNumber(1, 100),
    avatar: avatars[getRandomNumber(0, 5)],
    message: messages[getRandomNumber(0, 5)],
    name: generateRandomName()
  };
}

// Функция для генерации случайного имени
function generateRandomName() {
  const randomIndex = getRandomNumber(0, names.length - 1);
  return names[randomIndex];
}

