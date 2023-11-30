import {generatePhotosArray} from './data.js';
import { fullSizePicture } from './WindowFull-size.js';

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

export const renderPictures = () => {
  const fragment = new DocumentFragment();
  const picturesData = Array.from({ length: 25 }, () => generatePhotosArray());

  picturesData.forEach((data) => {
    const pictureElement = createPictureElement(data);
    pictureElement.addEventListener('click', () => fullSizePicture(data));
    fragment.appendChild(pictureElement);
  });

  document.querySelector('.pictures').appendChild(fragment);
};

renderPictures();
