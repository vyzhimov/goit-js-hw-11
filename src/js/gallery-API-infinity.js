import axios from 'axios';
import Notiflix from 'notiflix';

const loadingImg = document.querySelector('#loading-forever');
const API_KEY = '33863715-df25260fa40bd11fad8b98be3';
const END_POINT = 'https://pixabay.com/api/';
const DEFAULT_PARAMS =
  'image_type=photo&orientation=horizontal&safesearch=true';

export default class GalleryApiService {
  constructor() {
    this.page = 1;
    this.searchQuery = '';
    this.elemCount = 0;
    this.totalHits = 0;
  }

  async getGallery() {
    const URL = `${END_POINT}?key=${API_KEY}&q=${this.searchQuery}&per_page=40&page=${this.page}&${DEFAULT_PARAMS}`;

    try {
      const response = await axios.get(URL);
      const { hits, totalHits } = response.data;
      this.nextPage();
      return { hits, totalHits };
    } catch (error) {
      console.error(error);
      Notiflix.Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
      loadingImg.classList.add('hidden');
    }
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  setTotalHits(hits) {
    return (this.totalHits = hits);
  }
}
