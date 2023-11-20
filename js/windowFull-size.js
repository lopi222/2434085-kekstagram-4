import { createPictureElement } from './pictureThumbnailsRenderer.js';
import { generatePhotosArray } from './data.js';

const fullSizePicture = (pictureData) => {
  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
  const likesCount = bigPicture.querySelector('.likes-count');
  const commentsCount = bigPicture.querySelector('.comments-count');
  const socialComments = bigPicture.querySelector('.social__comments');
  const socialCaption = bigPicture.querySelector('.social__caption');

  bigPictureImg.src = pictureData.url;
  likesCount.textContent = pictureData.likes;
  commentsCount.textContent = pictureData.comments.length;
  socialCaption.textContent = pictureData.description;

  socialComments.innerHTML = '';
  pictureData.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;
    socialComments.appendChild(commentElement);
  });

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  //закрытие окна
  const closeFullSizePicture = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onDocumentKeydown);
  };

  //нажатие клавиши Esc
  function onDocumentKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeFullSizePicture();
    }
  }

  //клик по иконке закрытия
  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  closeButton.addEventListener('click', closeFullSizePicture);

  //обработчик нажатия клавиши Esc
  document.addEventListener('keydown', onDocumentKeydown);
};

//обработчик клика по миниатюрам
const renderPictures = () => {
  const fragment = new DocumentFragment();
  const picturesData = generatePhotosArray();

  picturesData.forEach((data) => {
    const pictureElement = createPictureElement(data);
    pictureElement.addEventListener('click', () => fullSizePicture(data));
    fragment.appendChild(pictureElement);
  });

  document.querySelector('.pictures').appendChild(fragment);
};

renderPictures();
