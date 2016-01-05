window.StateManager.pages.starmap = {
  getHtml: function () {
    return document.getElementById('starmap-html').innerHTML;
  },
  goToIndex: function () {
    window.StateManager.show('index');
  },
  init: function () {
    document.getElementById('go-to-index').addEventListener('click', this.goToIndex);
  },
  unload: function () {
    document.getElementById('go-to-index').removeEventListener('click', this.goToIndex);
  }
};
