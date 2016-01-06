$(function () {

  // Global Variable
  var keplerData = [];
  // On page load
  $.getJSON("data.min.json", function(data) {
    keplerData = data;
    $(window).trigger('hashchange');
  });

  // Call render on hash change
  $(window).on('hashchange', function() {
    render(window.location.hash);
  });

  function render(url) {
    var temp = url.split('/')[0];

    $('#space_container .page').removeClass('visible');

    var map = {
      // Homepage: route ''
      '':function() {
        renderStarmapPage(keplerData);
      },
    };

    if (map[temp]) {
      map[temp]();
    } else {
      renderErrorPage();
    }
  };

  function renderStarmapPage(data) {
    var page = $('.starmap');
    page.addClass('visible');
    starmap(data);
  };

  function renderErrorPage() {
    var page = $('.error');
    page.addClass('visible');
  };

  // function addScript(src) {
  //   var script = document.createElement('script');
  //   script.setAttribute('src', src);
  //   document.body.appendChild(script);
  // }

});
