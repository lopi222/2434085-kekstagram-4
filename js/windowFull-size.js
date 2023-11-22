//import { renderPhotos } from './pictureThumbnailsRenderer.js';
//import { generatePhotosArray } from './data.js';

export const fullSizePicture = (picturesData) => {
  picturesData.forEach((pictureData) => {
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
      const imageSrc = comment.image.src;
      const imageAlt = comment.image.alt;
      commentElement.innerHTML = `
      <img src="${imageSrc}" alt="${imageAlt}">
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
  });
};
//обработчик клика по миниатюрам
