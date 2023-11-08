// Модуль, отвечающий за отрисовку миниатюр
const picturesModule = (() => {
  const picturesData = [
    {
      url: 'url_для_изображения_1',
      description: 'описание_изображения_1',
      likes: 10,
      comments: 5
    },
    {
      url: 'url_для_изображения_2',
      description: 'описание_изображения_2',
      likes: 20,
      comments: 7
    }
  ];

  // Функция для создания DOM-элементов изображений
  const createPictureElement = (pictureData) => {
    const pictureTemplate = document.querySelector('#picture');
    const pictureClone = pictureTemplate.content.cloneNode(true);

    pictureClone.querySelector('.picture__img').setAttribute('src', pictureData.url);
    pictureClone.querySelector('.picture__img').setAttribute('alt', pictureData.description);
    pictureClone.querySelector('.picture__likes').textContent = pictureData.likes;
    pictureClone.querySelector('.picture__comments').textContent = pictureData.comments;

    return pictureClone;
  };

  const renderPictures = () => {
    const fragment = new DocumentFragment();

    picturesData.forEach((data) => {
      const pictureElement = createPictureElement(data);
      fragment.appendChild(pictureElement);
    });

    document.querySelector('.pictures').appendChild(fragment);
  };

  return {
    renderPictures: renderPictures
  };
})();

picturesModule.renderPictures();
