import Pristine from 'pristine';
import noUiSlider from 'nouislider';

const input = document.querySelector('.img-upload');
const imagePreview = document.querySelector('.img-upload__preview');
const effectsPreview = document.querySelectorAll('.img-upload__effects');
const scaleControl = document.querySelector('.img-upload__scale');
const slider = document.querySelector('.effect-level__value');
const textComment = document.querySelector('.text__description');
const hashtags = document.querySelector('.text__hashtags');

document.getElementById('image-input').addEventListener('change', (event) => {
  const file = event.target.files[0];
  const image = document.getElementById('image-preview');

  const reader = new FileReader();
  reader.onload = function(e) {
    image.src = e.target.result;
  };
  reader.readAsDataURL(file);
});

// Функция для обработки события отправки формы
document.getElementById('image-upload-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const file = document.getElementById('image-input').files[0];

  // Создание формы для отправки на сервер
  const formData = new FormData();
  formData.append('image', file);

  // Показываем форму редактирования изображения
  const overlay = document.querySelector('.img-upload');
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
});

// Изменение масштаба изображения
scaleControl.addEventListener('input', () => {
  const scaleValue = scaleControl.value;
  imagePreview.style.transform = `scale(${scaleValue})`;
});

// Применение эффекта
const effectsList = document.querySelector('.effectslist');
effectsList.addEventListener('change', (e) => {
  const selectedEffect = e.target.value;
  imagePreview.className = '';
  imagePreview.classList.add(`effects__preview--${selectedEffect}`);
});

// Выбор глубины эффекта
slider.addEventListener('input', () => {
  const value = slider.value;
  const effectName = document.querySelector('.effectslist input:checked').value;
  const depth = value / 100;
  if (effectName !== 'none') {
    imagePreview.style.filter = `brightness(${1 + 2 * depth})`;
  }
});

// Добавление текстового комментария
textComment.addEventListener('input', () => {
  // eslint-disable-next-line no-unused-vars
  const comment = textComment.value;
});

// Добавление хэш-тегов
hashtags.addEventListener('input', () => {
  // eslint-disable-next-line no-unused-vars
  const tags = hashtags.value.split(' ');
});

export function initializeFormValidation() {
  document.addEventListener('DOMContentLoaded', () => {
    const imageForm = document.getElementById('imageForm');
    const pristine = new Pristine(imageForm);

    imageForm.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    const hashtagsInput = document.getElementById('hashtags');
    const commentInput = document.getElementById('comment');

    hashtagsInput.addEventListener('input', () => {
      pristine.validate();
    });

    commentInput.addEventListener('input', () => {
      pristine.validate();
    });
  });
}

export { input, imagePreview, effectsPreview, scaleControl, slider, textComment, hashtags };

// редактировать масштаб изображения
let currentValue = 100;
const step = 25;
const valueField = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview');

const smallerButton = document.querySelector('.scale__control--smaller');
smallerButton.addEventListener('click', () => {
  if (currentValue > 25) {
    currentValue -= step;
  }
  updateScaleValue();
});

const biggerButton = document.querySelector('.scale__control--bigger');
biggerButton.addEventListener('click', () => {
  if (currentValue < 100) {
    currentValue += step;
  }
  updateScaleValue();
});

function updateScaleValue() {
  valueField.value = `${currentValue  }%`;
  const scale = currentValue / 100;
  previewImage.style.transform = `scale(${scale})`;
}

//применение эффекта к изображению
const intensitySlider = document.getElementById('intensity-slider');

noUiSlider.create(intensitySlider, {
  start: 100,
  range: {
    'min': 0,
    'max': 100
  }
});

//изображение
const targetImage = document.getElementById('target-image');
const checkedRadio = document.querySelector('.effects__radio:checked');

//обработчик  для изменения эффекта
document.querySelectorAll('.effects__radio').forEach((radio) => {
  radio.addEventListener('change', function() {
    const effect = this.value;
    //применение выбранного эффекта и его интенсивности к изображению
    applyEffect(effect, intensitySlider.noUiSlider.get());
  });
});

//обработчик для изменения интенсивности
intensitySlider.noUiSlider.on('update', (values, handle) => {
  const selectedEffect = document.querySelector('.effects__radio:checked').value;
  applyEffect(selectedEffect, values[handle]);
});

function applyEffect(effect, intensity) {
  if (effect === 'heat') {
    targetImage.style.filter = `brightness(${  intensity / 100 * 2  })`;
  } else if (effect === 'chrome') {
    targetImage.style.filter = `grayscale(${  intensity / 100  })`;
  } else if (effect === 'sepia') {
    targetImage.style.filter = `sepia(${  intensity / 100  })`;
  } else if (effect === 'marvin') {
    targetImage.style.filter = `invert(${  intensity  }%)`;
  } else if (effect === 'phobos') {
    targetImage.style.filter = `blur(${  intensity / 33  }px)`;
  } else {
    targetImage.style.filter = 'none';
  }

  document.querySelector('.effect-level__value').value = intensity;
}

//обработчик для скрытия слайдера и его контейнера при выборе "Оригинал"
document.getElementById('effect-none').addEventListener('change', () => {
  document.querySelector('.img-upload__effect-level').style.display = 'none';
});

//обработчик событий для отображения слайдера и его контейнера при выборе другого эффекта
document.querySelectorAll('.effects__radio:not(#effect-none)').forEach((radio) => {
  radio.addEventListener('change', () => {
    document.querySelector('.img-upload__effect-level').style.display = 'block';
  });
});

export { targetImage, checkedRadio, applyEffect };
