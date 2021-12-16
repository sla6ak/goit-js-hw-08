// Add imports above this line
import { galleryItems } from './gallery-items';

// *****************************************************************************************************
import '../../node_modules/simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
// *****************************************************************************************************

// Change code below this line

console.log(galleryItems);

const gallerey = document.querySelector('.gallery');

// уже знакомый метод верстки через шаблонную функцию
const imgEl = galleryItems => {
  return galleryItems.map(img => {
    let linkEl = document.createElement('a');
    linkEl.classList.add('gallery__item');
    linkEl.href = img.original;
    let imgEl = document.createElement('img');
    imgEl.src = img.preview;
    imgEl.alt = img.description;
    imgEl.title = img.description;
    imgEl.classList.add('gallery__image');
    linkEl.append(imgEl);
    return linkEl;
  });
};

gallerey.append(...imgEl(galleryItems));

// этот кусок кода написан не мной, а взят из документации где в аргументы передаем настройки для новой галереи
let gallerySet = new SimpleLightbox('.gallery a', { captionPosition: 'bottom', captionDelay: 250 });

gallerySet.on('show.simplelightbox', function () {
  console.log('Получаеться прослушивать клики даже ненужно, все уже есть под капотом');
});
