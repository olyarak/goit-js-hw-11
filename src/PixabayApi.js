import axios from 'axios';
import Notiflix from 'notiflix';

const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '33631762-f3dc574ffca24d2c6ab2f3eab';

export default class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

    async fetchImages() {

        const response = await axios.get(
            `?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=40`
        );
        const images = await response.json();

        if (images !== []) {
            return images;
        } else {
            Notiflix.Notify.failure(
                'Sorry, there are no images matching your search query. Please try again.'
            );
        }
    }
  

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
