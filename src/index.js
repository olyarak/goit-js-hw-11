import PixabayApi from './PixabayApi.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { loadMoreBtn } from './loadMore';

loadMoreBtn.hide();

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
loadMoreBtn.button.addEventListener('click', fetchImages);

const pixabayApi = new PixabayApi();
const lightbox = new SimpleLightbox('.gallery a', {});
form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  pixabayApi.searchQuery = form.elements.searchQuery.value;
  pixabayApi
    .fetchImages()
    .then(images => console.log(images))
    .catch(error => console.error(error));
}

function onSubmit(event) {
  event.preventDefault();

  const query = event.currentTarget.elements.searchQuery.value.trim();
  if (query === '') {
    return Notify.info(`Enter a word to search for images.`);
  }
  pixabayApi.searchQuery = query;
  loadMoreBtn.show();
  pixabayApi.resetPage();
  clearGallery();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disabled();
  pixabayApi
    .fetchImages()
    .then(({ data }) => {
      console.log(data);
      if (data === []) {
        Notify.info(
          `Sorry, there are no images matching your search query: ${fetchImagesService.searchQuery}. Please try again.`
        );
        loadMoreBtn.hide();
        return;
      }
      gallery.insertAdjacentHTML('beforeend', makeImageMarkup(data));
      lightbox.refresh();
      const { totalHits } = data;

      if (gallery.children.length === totalHits) {
        Notify.info(
          `We're sorry, but you've reached the end of search results.`
        );
        loadMoreBtn.hide();
      } else {
        loadMoreBtn.enable();
        Notify.success(`Hooray! We found ${totalHits} images.`);
      }
    })
    .catch(error => console.error(error));
}

function makeImageMarkup({ hits }) {
  const markup = hits.map(
    ({
      largeImageURL,
      webformatURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `<div class="photo-card">
    <a class="gallery-item" href="${largeImageURL}"><img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
    <div class="info">
      <p class="info-item">
        <b>Likes: </b>${likes}
      </p>
      <p class="info-item">
        <b>Views: </b>${views}
      </p>
      <p class="info-item">
        <b>Comments: </b>${comments}
      </p>
      <p class="info-item">
        <b>Downloads: </b>${downloads}
      </p>
    </div>
  </div>`
  );

  return markup.join('');
}

function clearGallery() {
  gallery.innerHTML = '';
}
