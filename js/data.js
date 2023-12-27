import { getRandomInt } from './until.js';
import {descriptions, avatars, messages, names } from './constants.js';

function generateDescription() {
  const randomIndex = getRandomInt(0, descriptions.length - 1);
  return descriptions[randomIndex];
}

function generateCommentsArray() {
  const commentsArray = [];
  const numComments = getRandomInt(0, 30);

  for (let i = 1; i <= numComments; i++) {
    const comment = generateComment();
    commentsArray.push(comment);
  }

  return commentsArray;
}

function generateComment() {
  return {
    id: getRandomInt(1, 100),
    avatar: avatars[getRandomInt(0, 5)],
    message: messages[getRandomInt(0, 5)],
    name: generateRandomName()
  };
}

function generateRandomName() {
  const randomIndex = getRandomInt(0, names.length - 1);
  return names[randomIndex];
}

export function generatePhotosArray() {
  return {
    id: getRandomInt(1, 100),
    url: `photos/${getRandomInt(1, 25)}.jpg`,
    description: generateDescription(),
    likes: getRandomInt(15, 200),
    comments: generateCommentsArray()
  };
}
