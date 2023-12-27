import {sendDataToServer} from './remoteServerModule.js';
import {renderPhotos} from './pictureThumbnailsRenderer.js';

const handleFormErrors = (errorType, errorMessage) => {
  if (errorType === 'hashTagError') {
    const hashTagInput = document.getElementById('hashTagInput');
    hashTagInput.setCustomValidity(errorMessage);
  } else if (errorType === 'exceededHashTagLimitError') {
    const errorContainer = document.getElementById('hashTagErrorContainer');
    errorContainer.innerText = errorMessage;
    errorContainer.style.display = 'block';
  } else if (errorType === 'duplicateHashTagsError') {
    const errorContainer = document.getElementById('hashTagErrorContainer');
    errorContainer.innerText = errorMessage;
    errorContainer.style.display = 'block';
  }
};

// Функция для показа сообщения об успешной отправке данных
const showSuccessMessage = () => {
  const successMessage = document.getElementById('success-message');
  successMessage.style.display = 'block';
};

// Функция для показа сообщения об ошибке отправки данных
const showErrorMessage = () => {
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = 'block';
};

// Функция для закрытия сообщений после успешной отправки или ошибки
const closeMessages = () => {
  const successMessage = document.getElementById('success-message');
  const errorMessage = document.getElementById('error-message');
  successMessage.style.display = 'none';
  errorMessage.style.display = 'none';
};

// Функция для сброса состояния формы и закрытия
const resetFormAndClose = () => {
  const scaleInput = document.getElementById('scaleInput');
  scaleInput.value = 100;
  closeMessages();
};

// Нажатие на кнопку .img-upload__cancel
const cancelButton = document.querySelector('.img-upload__cancel');
cancelButton.addEventListener('click', resetFormAndClose);

// Обработка запроса на отправку данных
const submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', async () => {
  submitButton.disabled = true; // Disable submit button during data submission
  const formData = new FormData(document.getElementById('yourFormId'));
  try {
    // eslint-disable-next-line no-unused-vars
    const responseData = await sendDataToServer(formData);
    resetFormAndClose();
    showSuccessMessage();
  } catch (error) {
    if (error.type === 'formError') {
      handleFormErrors(error.errorType, error.errorMessage);
    } else if (error.type === 'sendError') {
      showErrorMessage();
    }
  } finally {
    submitButton.disabled = false;
  }
});

// Обработчики закрытия сообщений
const successButton = document.querySelector('.success__button');
const errorButton = document.querySelector('.error__button');
successButton.addEventListener('click', closeMessages);
errorButton.addEventListener('click', closeMessages);

// Обработчики для закрытия сообщений по нажатию клавиши Esc
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMessages();
  }
});

export {handleFormErrors, showSuccessMessage, showErrorMessage, closeMessages, resetFormAndClose};

const data = []; // Массив фотографий, полученных с сервера

// Функция для получения случайных фотографий
function getRandomPhotos(count) {
  const randomPhotos = [];
  const copyPhotos = [...data]; // Копия массива фотографий

  for(let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * copyPhotos.length);
    randomPhotos.push(copyPhotos[randomIndex]);
    copyPhotos.splice(randomIndex, 1);
  }

  return randomPhotos;
}

// Функция для получения фотографий, отсортированных по количеству комментариев
function getDiscussedPhotos() {
  return data.sort((a, b) => b.comments.length - a.comments.length);
}

function removePhotos() {
  const picturesContainer = document.querySelector('.pictures');
  while (picturesContainer.firstChild) {
    picturesContainer.removeChild(picturesContainer.firstChild);
  }
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

// Обработчик изменения фильтра
export function handleFilterChange(filter) {
  let filteredPhotos;

  switch(filter) {
    case 'default':
      filteredPhotos = [...data];
      break;
    case 'random':
      filteredPhotos = getRandomPhotos(10);
      break;
    case 'discussed':
      filteredPhotos = getDiscussedPhotos();
      break;
    default:
      filteredPhotos = [...data];
  }

  const debouncedHandleFilterChange = debounce(handleFilterChange, 500);
  removePhotos(debouncedHandleFilterChange);
  renderPhotos(filteredPhotos);
}
