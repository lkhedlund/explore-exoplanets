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
      '': function() {
        renderStarmapPage(keplerData);
      },

      '#system': function() {
        // Grab the id after the '#system' keyword
        pk = url.split("#system/")[1].trim();
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

  function renderSystemPage(pk, data) {
    var page = $('.system');
    // Find the star at the chosen index
    if (data.length) {
      // Loop through each item in the JSON data and find the star
      data.forEach(function(item) {
        // If both a star and with a pk
        if ((item.model === "kepler_exoplanets.star") && (item.pk == pk)) {
          // render the system with the necessary fields
          system(item.fields);
        }
      });
    };
    page.addClass('visible');
  }

  // function renderPlanetPage(pk, data) {
  //   var page = $('.planet');
  //   page.addClass('visible');
  //   planet();
  // }
  //
  // function renderStarPage(pk, data) {
  //   var page = $('.star');
  //   page.addClass('visible');
  //   star();
  // }

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
