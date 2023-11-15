import { getRandomNumber } from './until.js';
import {descriptions, avatars, messages, names } from './constants.js';

export function generatePhotosArray() {
  return {
    id: getRandomNumber(1, 100),
    url: `photos/${getRandomNumber(1, 25)}.jpg`,
    description: generateDescription(),
    likes: getRandomNumber(15, 200),
    comments: generateCommentsArray()
  };
}

export function generateDescription() {
  const randomIndex = getRandomNumber(0, descriptions.length - 1);
  return descriptions[randomIndex];
}

// Функция для генерации массива случайных комментариев
export function generateCommentsArray() {
  const commentsArray = [];
  const numComments = getRandomNumber(0, 30);

  for (let i = 1; i <= numComments; i++) {
    const comment = generateComment();
    commentsArray.push(comment);
  }

  return commentsArray;
}

// Функция для генерации случайного комментария
export function generateComment() {
  return {
    id: getRandomNumber(1, 100),
    avatar: avatars[getRandomNumber(0, 5)],
    message: messages[getRandomNumber(0, 5)],
    name: generateRandomName()
  };
}

// Функция для генерации случайного имени
export function generateRandomName() {
  const randomIndex = getRandomNumber(0, names.length - 1);
  return names[randomIndex];
}
