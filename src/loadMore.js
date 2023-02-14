const loadMoreBtn = {
  button: document.querySelector('.load-more'),

  show() {
    this.button.classList.remove('is-hidden');
  },

  hide() {
    this.button.classList.add('is-hidden');
  },

  disabled() {
    this.button.disabled = true;
  },

  enable() {
    this.button.disabled = false;
  },
};

export { loadMoreBtn };
