const input = document.querySelector('.img-upload');
const imagePreview = document.querySelector('.img-upload__preview');
const effectsPreview = document.querySelectorAll('.img-upload__effects');
const scaleControl = document.querySelector('.img-upload__scale');
const slider = document.querySelector('.effect-level__value');
const textComment = document.querySelector('.text__description');
const hashtags = document.querySelector('.text__hashtags');

input.addEventListener('change', () => {
  const file = input.files0;
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
  const overlay = document.querySelector('.img-uploadoverlay');
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
