import Notiflix from 'notiflix';
import GalleryApiService from './gallery-API';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.getElementById('search-form');
const photoGallery = document.querySelector('.gallery');
const loadingImg = document.querySelector('#loading-forever');
const galleryApiService = new GalleryApiService();

input.addEventListener('submit', onSubmit);
galleryApiService.getGallery();

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();
  galleryApiService.searchQuery = value;
  loadingImg.classList.remove('hidden');

  clearGallery();
  galleryApiService.resetPage();

  fetchPhotos().finally(() => {
    form.reset();
    if (photoGallery.children.length !== 0)
      Notiflix.Notify.success(
        `Hooray! We found ${galleryApiService.totalHits} images`
      );
  });
}

function fetchPhotos() {
  return galleryApiService
    .getGallery()
    .then(gallery => {
      if (gallery.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }

      const total = gallery.totalHits;
      galleryApiService.setTotalHits(total);
      return gallery.hits.reduce(
        (markup, photo) => createMarkup(photo) + markup,
        ''
      );
    })
    .then(markup => {
      appendPhotoToGallery(markup);

      galleryApiService.elemCount = photoGallery.children.length;
      if (galleryApiService.elemCount === galleryApiService.totalHits) {
        loadingImg.classList.add('hidden');
      }
      gallery.refresh();
    });
}

function createMarkup({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
     <div class="photo-card">
        <a href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a>
        <div class="info">
            <p class="info-item">
                <b>Likes</b> <span>${likes}</span>
            </p>
            <p class="info-item">
                <b>Views</b> <span>${views}</span>
            </p>
            <p class="info-item">
                <b>Comments</b> <span>${comments}</span>
            </p>
            <p class="info-item">
                <b>Downloads</b> <span>${downloads}</span>
            </p>
        </div>
    </div>
    `;
}

function appendPhotoToGallery(markup) {
  photoGallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  photoGallery.innerHTML = '';
}

let gallery = new SimpleLightbox('.photo-card a');

window.addEventListener('scroll', () => {
  const documentRect = document.documentElement.getBoundingClientRect();

  if (documentRect.bottom < document.documentElement.clientHeight + 100) {
    fetchPhotos();
  }
});
