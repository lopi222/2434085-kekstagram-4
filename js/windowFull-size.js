import { input, imagePreview, effectsPreview, initializeFormValidation}from './truthOrDare.js';

//вызыв функции initializeFormValidation из файла
initializeFormValidation();

input.addEventListener('change', () => {
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const imageUrl = e.target.result;
    imagePreview.src = imageUrl;
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url(${imageUrl})`;
    });
  };

  reader.readAsDataURL(file);

  // Показываем форму редактирования изображения
  const overlay = document.querySelector('.img-upload-overlay');
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

//зкартие формы
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeImageEditForm();
  }
});

document.querySelector('.img-upload__cancel').addEventListener('click', () => {
  closeImageEditForm();
});

function closeImageEditForm() {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.body.classList.remove('modal-open');
}


export const fullSizePicture = (picturesData) => {
  picturesData.forEach((pictureData) => {
    const bigPicture = document.querySelector('.big-picture');
    const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
    const likesCount = bigPicture.querySelector('.likes-count');
    const commentsCount = bigPicture.querySelector('.comments-count');
    const socialComments = bigPicture.querySelector('.social__comments');
    const socialCaption = bigPicture.querySelector('.social__caption');

    //отображение блоков комментариев и загрузки комментариев
    const commentCount = document.querySelector('.social__comment-count');
    commentCount.classList.remove('hidden');

    const commentsLoader = document.querySelector('.comments-loader');
    commentsLoader.classList.remove('hidden');

    //Заполнение контента
    bigPictureImg.src = pictureData.url;
    likesCount.textContent = pictureData.likes;
    commentsCount.textContent = pictureData.comments.length;
    socialCaption.textContent = pictureData.description;

    socialComments.innerHTML = '';
    //Отображение комментариев
    const comments = pictureData.comments;
    const commentsChunkSize = 5;
    let visibleComments = 0;

    function loadMoreComments() {
      const remainingComments = comments.slice(visibleComments, visibleComments + commentsChunkSize);

      remainingComments.forEach((comment) => {
        const commentElement = document.createElement('li');
        commentElement.classList.add('social__comment');
        const imageSrc = comment.image.src;
        const imageAlt = comment.image.alt;
        commentElement.innerHTML = `
          <img src="${imageSrc}" alt="${imageAlt}">
        `;
        socialComments.appendChild(commentElement);
      });

      visibleComments += commentsChunkSize;

      //Обновление счётчика показанных комментариев в блоке .social__comment-count
      commentCount.textContent = visibleComments;

      //Если все комментарии показаны, скрыть кнопку
      if (visibleComments >= comments.length) {
        commentsLoader.classList.add('hidden');
        commentsLoader.removeEventListener('click', loadMoreComments);
      }
    }

    commentsLoader.addEventListener('click', loadMoreComments);

    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');

    //Закрытие окна
    const closeFullSizePicture = () => {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onDocumentKeydown);
      commentsLoader.removeEventListener('click', loadMoreComments);
    };

    //нажатие клавиши Esc
    function onDocumentKeydown(evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        closeFullSizePicture();
      }
    }

    //Клик по иконке закрытия
    const closeButton = bigPicture.querySelector('.big-picture__cancel');
    closeButton.addEventListener('click', closeFullSizePicture);

    //Обработчик нажатия клавиши Esc
    document.addEventListener('keydown', onDocumentKeydown);
  });
};
