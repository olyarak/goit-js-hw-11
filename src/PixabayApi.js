import axios from 'axios';
const ENDPOINT = 'https://pixabay.com/api/';
const API_KEY = '33631762-f3dc574ffca24d2c6ab2f3eab';

export default class PixabayApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    try {
      const response = await axios.get(
        `${ENDPOINT}?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&per_page=40&orientation=horizontal&image_type=photo&safesearch=true`
      );
      this.incrementPage();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
