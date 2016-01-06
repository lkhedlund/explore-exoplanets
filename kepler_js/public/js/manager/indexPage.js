window.StateManager.pages.index = {
  getHtml: function () {
    return document.getElementById('index-html').innerHTML;
  },
  goToIndex: function () {
    window.StateManager.show('starmap');
  },
  init: function () {
    document.getElementById('go-to-starmap').addEventListener('click', this.goToIndex);
  },
  unload: function () {
    document.getElementById('go-to-starmap').removeEventListener('click', this.goToIndex);
    console.log("Unloaded successfully");
  }
};
