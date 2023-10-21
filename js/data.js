const descriptions = [
  'Красивый закат на пляже',
  'Горы в тумане',
  'Цветущий вишневый сад',
  'Уютный камин и книжная полка',
  'Городская скульптура в центре',
  'Залитая солнцем луговая поляна'
];

const avatars = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg'
];

const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = [
  'Александр',
  'Екатерина',
  'Иван',
  'Ольга',
  'Павел',
  'Мария',
  'Дмитрий',
  'Анна'
];

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для создания массива сгенерированных объектов фотографий
// eslint-disable-next-line no-unused-vars
function generatePhotosArray() {
  const photosArray = [];

  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: generateDescription(),
      likes: getRandomNumber(15, 200),
      comments: generateCommentsArray()
    };

    photosArray.push(photo);
  }

  return photosArray;
}

// Функция для генерации случайного описания фотографии
function generateDescription() {
  const randomIndex = getRandomNumber(0, descriptions.length - 1);
  return descriptions[randomIndex];
}

// Функция для генерации массива случайных комментариев
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

