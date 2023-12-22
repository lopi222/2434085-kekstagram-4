import { fullSizePicture } from './WindowFull-size.js';
import { getData } from './remoteServerModule.js';

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

export const renderPictures = async () => {
  try {
    const picturesData = await getData();
    const fragment = new DocumentFragment();
    picturesData.forEach((data) => {
      const pictureElement = createPictureElement(data);
      pictureElement.addEventListener('click', () => fullSizePicture(data));
      fragment.appendChild(pictureElement);
    });
    document.querySelector('.pictures').appendChild(fragment);
  } catch (error) {
    //обработка возможной ошибки запроса
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Failed to load pictures from the server';
    errorMessage.classList.add('error-message');
    document.querySelector('.pictures').appendChild(errorMessage);
  }
};

renderPictures();
