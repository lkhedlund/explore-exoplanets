window.StateManager = {
  pages: {},
  currentPage: null,
  // This function transitions to the new page
  show: function (pageId) {
    if (this.currentPage !== null) {
      var lastPage = this.pages[this.currentPage];
      console.log(lastPage);
      lastPage.unload();
    }
    this.currentPage = pageId;
    var page = this.pages[this.currentPage];
    this.el.innerHTML += page.getHtml();
    setTimeout(function () {
      if (this.el.children.length > 1) {
        this.el.children[1].addEventListener('transitionend', function () {
          this.el.children[0].remove();
          page.init();
        }.bind(this));
        this.el.children[1].style.opacity = 1;
      } else {
        page.init();
      }
    }.bind(this), 0);
  },
  // This function is called once to start the app
  init: function () {
    this.el = document.createElement('div');
    this.el.id = 'state';
    document.body.appendChild(this.el);
    this.show('index');
  }
};
