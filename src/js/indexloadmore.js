import Notiflix from 'notiflix';
import GalleryApiService from './gallery-API';
import LoadMoreBtn from './components/load-more-btn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const input = document.getElementById('search-form');
const photoGallery = document.querySelector('.gallery');
const loadMoreBtn = new LoadMoreBtn({ selector: '#loadMore', isHidden: true });
const galleryApiService = new GalleryApiService();

input.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchPhotos);
galleryApiService.getGallery();

function onSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();
  galleryApiService.searchQuery = value;

  clearGallery();
  galleryApiService.resetPage();
  loadMoreBtn.show();

  fetchPhotos().finally(() => {
    form.reset();
    if (photoGallery.children.length !== 0)
      Notiflix.Notify.success(
        `Hooray! We found ${galleryApiService.totalHits} images`
      );
  });
}

function fetchPhotos() {
  loadMoreBtn.disable();
  return galleryApiService
    .getGallery()
    .then(gallery => {
      if (gallery.length === 0) {
        loadMoreBtn.hide();
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

      if (galleryApiService.page !== 2) {
        const { height: cardHeight } = document
          .querySelector('.gallery')
          .firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: cardHeight * 2,
          behavior: 'smooth',
        });
      }

      loadMoreBtn.enable();
      galleryApiService.elemCount = photoGallery.children.length;
      if (galleryApiService.elemCount === galleryApiService.totalHits) {
        Notiflix.Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
        loadMoreBtn.hide();
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
