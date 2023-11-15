import { generatePhotosArray } from './data.js';

// Функция для создания DOM-элементов изображений
export const createPictureElement = (pictureData) => {
  const pictureTemplate = document.querySelector('#picture');
  const pictureClone = pictureTemplate.content.cloneNode(true);

  pictureClone.querySelector('.picture__img').setAttribute('src', pictureData.url);
  pictureClone.querySelector('.picture__img').setAttribute('alt', pictureData.description);
  pictureClone.querySelector('.picture__likes').textContent = pictureData.likes;
  pictureClone.querySelector('.picture__comments').textContent = pictureData.comments.length;

  return pictureClone;
};

const renderPictures = () => {
  const fragment = new DocumentFragment();
  const picturesData = generatePhotosArray();

  picturesData.forEach((data) => {
    const pictureElement = createPictureElement(data);
    fragment.appendChild(pictureElement);
  });

  document.querySelector('.pictures').appendChild(fragment);
};

renderPictures();
