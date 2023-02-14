import PixabayApi from './PixabayApi.js';

const form = document.getElementById('search-form');

const pixabayApi = new PixabayApi();
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  pixabayApi.searchQuery = form.elements.searchQuery.value;
  pixabayApi
    .fetchImages()
    .then(images => console.log(images))
    .catch(error => console.error(error));
}
