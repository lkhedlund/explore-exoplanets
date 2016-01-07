var starmap = function(keplerData) {

  var controls, camera, scene, renderer, container, intersects;

  // Load stars glow texture
  var texloader = new THREE.TextureLoader();
  var glow = texloader.load( 'public/images/glow.png' );

  // Set up canvas dimensions
  var width = 1000;
  var height = window.innerHeight;

  // Set up tools for hover and click events
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(), INTERSECTED;

  // Create the starmap
  start();

  function start(){

    //Scene creation
    scene = new THREE.Scene();
    container = document.getElementById( 'space_container' );

    // PerspectiveCamera creation and Set up. Parameters
    // 1. FOV – We’re using 45 degrees for our field of view.
    // 2. Aspect – We’re simply dividing the browser width and height to get an aspect ratio.
    // 3. Near – This is the distance at which the camera will start rendering scene objects.
    // 4. Far – Anything beyond this distance will not be rendered. Perhaps more commonly known as the draw distance.
    camera = new THREE.PerspectiveCamera(75, width/height, 50, 10000);
    camera.position.set(0, 0, 2600);
    scene.add(camera);

    // Mouse controls - Zoom only for skybox and starmap
    controls = new THREE.OrbitControls( camera );
    controls.minDistance = 200;
    controls.maxDistance = 2600;
    controls.enableRotate = false;
    controls.enablePan = false;
    skybox_controls.minDistance = 1000;
    skybox_controls.enableRotate = false;
    skybox_controls.enablePan = false;

    // // controls.addEventListener("change", render);
    // controls.target.set(0, 0, 2600);

    var light = new THREE.PointLight(0xffffff);
    light.position.set(0,0,2375);
    scene.add(light);

    // Create the WebGL renderer and append it to the DOM bia the body element
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    renderer.render(scene,camera);

    // Add all the stars to the scene.
    var geometry, material, star;

    // Load star data from JSON file
    for (var i = 0; i < keplerData.length; i++) {
      var star = keplerData[i]["fields"];
      createStar(star.stellar_temp, star.right_ascension, star.declination, star.light_years_dist);
    };

    function createStar (temp, ra, declination, ly) {
      color = star_color(temp);
      geometry = new THREE.SphereGeometry(1, 15, 15);
      material = new THREE.MeshBasicMaterial({color: color, wireframe:false});
      star = new THREE.Mesh(geometry, material);
      scene.add(star);
      star.position.set((ra - 290) * 5 * (ly / 1000), (declination - 45) * 5 * (ly / 1000),ly - 500);

      // Star glow (using sprites)
      var spriteMaterial = new THREE.SpriteMaterial({
        map: glow,
        color: color, transparent: false, blending: THREE.AdditiveBlending
      });
      sprite = new THREE.Sprite( spriteMaterial );
      sprite.scale.set(8, 8, 8);
      star.add(sprite);
    }

    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
  }

  function render() {
    renderer.render(scene,camera);
  }

  // EVENT LISTENERS
  // Planets turn blue on mouseover (It will make them brighter)
  document.addEventListener('mousemove', onDocumentMouseMove, false);
  function onDocumentMouseMove() {
    event.preventDefault();
    grabPlanets();
    if (intersects.length > 0) {
      // stars.forEach(function(element){element.material.color.setHex(star_color())});
      var hoverPlanet = intersects[0].object;
      if (hoverPlanet.scale.x < 2) {
        hoverPlanet.scale.x += 1;
        hoverPlanet.scale.y += 1;
        hoverPlanet.scale.z += 1;
        render();
      }
    }
  }

  // Make the planets clickable (for now, it alerts the coordinates)
  document.addEventListener('click', onDocumentMouseClick, false);
  function onDocumentMouseClick() {
    event.preventDefault();
    grabPlanets();
    if (intersects.length > 0) {
      clickedPlanet = intersects[0].object;
      x = clickedPlanet.position.x;
      y = clickedPlanet.position.y;
      z = clickedPlanet.position.z;
      alert('Star coordinates:' + '\nx: ' + x.toFixed(2) + '\ny: ' + y.toFixed(2) + '\nz: ' + z.toFixed(2));
    }
  }

  // Create an event listener that resizes the renderer with the browser window.
  window.addEventListener('resize', function() {
    width = window.innerWidth,
    height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  });

  // Deactivate trackball controlls when interacting with the panel
  $('.sidebar').on('mouseenter', function() {
    controls.enabled = false;
    skybox_controls.enabled = false;
  });
  $('.sidebar').on('mouseleave', function() {
    controls.enabled = true;
    skybox_controls.enabled = true;
  });

  // Stars are colored based on their temperature
  function star_color(temp) {
    if (temp > 28000) {
      return 0xaabfff
    } else if (temp > 10000) {
      return 0xe4e8ff
    } else if (temp > 7500) {
      return 0xffffff
    } else if (temp > 6000) {
      return 0xffffe0;
    } else if (temp > 4900) {
      return 0xffff66
    } else if (temp > 3500) {
      return 0xffa44c
    } else if (temp > 2000) {
      return 0xf73d28;
    } else {
      return 0xffffff
    }
  }

  // Register the targeted planet with click events
  function grabPlanets() {
    var offset = {
      x: document.getElementsByTagName("canvas")[0].offsetLeft,
      y: document.getElementsByTagName("canvas")[0].offsetTop,
    }
    mouse.x = ((event.clientX - offset.x) / renderer.domElement.width) * 2 - 1;
    mouse.y = 1 - ((event.clientY - offset.y) / renderer.domElement.height) * 2;
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children, true);
  };

  // Button on sidebar to reset camera
  $('#camera-reset').on('click', function() {
    camera.position.set(0, 0, controls.maxDistance);
    document.querySelector('#star-slider').value = controls.maxDistance;
    document.querySelector('#dist').value = controls.maxDistance;
  });

  // Slider on sidebar to move forwards/backwards
  $('#star-slider').on('click', function() {
    camera.position.set(0, 0, dist.value);
  });
};
