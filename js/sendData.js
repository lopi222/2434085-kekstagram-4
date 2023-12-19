import {sendDataToServer} from './remoteServerModule.js';

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
    const responseData = await sendDataToServer(formData); //подключение?
    resetFormAndClose();
    showSuccessMessage();
    // Используем responseData для чего-то
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
