//import { generatePhotosArray } from './data.js';
//import { createPictureElement } from './pictureThumbnailsRenderer.js';
import { renderPictures } from './pictureThumbnailsRenderer.js';

const photos = renderPictures();

// eslint-disable-next-line no-console
console.log(photos);
