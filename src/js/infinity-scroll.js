import Notiflix from 'notiflix';
import GalleryApiService from './gallery-API';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.getElementById('search-form');
const photoGallery = document.querySelector('.gallery');
const loadingImg = document.querySelector('#loading-forever');
const galleryApiService = new GalleryApiService();
let isNewFetch = true;

input.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  isNewFetch = true;
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
    isNewFetch = false;
  });
}

function fetchPhotos() {
  return galleryApiService
    .getGallery()
    .then(gallery => {
      if (gallery.hits.length === 0 && isNewFetch !== false) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        loadingImg.classList.add('hidden');
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

      let photoCards = document.querySelectorAll('.photo-card');
      let lastPhotoCard = photoCards[photoCards.length - 1];
      photoCards.forEach(card => {
        observer.unobserve(card);
      });
      observer.observe(lastPhotoCard);

      galleryApiService.elemCount = photoGallery.children.length;
      if (galleryApiService.elemCount >= galleryApiService.totalHits) {
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
        loadingImg.classList.add('hidden');
        observer.unobserve(lastPhotoCard);
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

const options = {
  root: null,
  threshold: 1,
};

const observer = new IntersectionObserver(onScroll, options);

function onScroll(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      fetchPhotos();
    }
  });
}
