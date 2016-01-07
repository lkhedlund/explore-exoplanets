$(function () {
  // Global Variable
  var keplerData = [];
  var currentScript = [];
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
      '': function() {
        renderStarmapPage(keplerData);
      },

      '#system': function() {
        // Grab the id after the '#system' keyword
        // pk = url.split("#system/")[1].trim();

        //NOTE: PK set to 1 for testing
        pk = 1;
        renderSystemPage(pk,keplerData);
      },
      '#planet': function() {
        // Grab the id after the '#system' keyword
        // pk = url.split("#system/")[1].trim();

        //NOTE: PK set to 1 for testing
        pk = 1;
        renderPlanetPage(pk,keplerData);
      },
      '#star': function() {
        // Grab the id after the '#system' keyword
        // pk = url.split("#system/")[1].trim();

        //NOTE: PK set to 1 for testing
        pk = 1;
        renderStarPage(pk,keplerData);
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

  function renderPlanetPage(pk, data) {
    var page = $('.planet');
    page.addClass('visible');
    planet();
  }

  function renderStarPage(pk, data) {
    var page = $('.star');
    page.addClass('visible');
    star();
  }

  function renderSystemPage(pk, data) {
    var page = $('.system');
    page.addClass('visible');
    system();
  }

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
