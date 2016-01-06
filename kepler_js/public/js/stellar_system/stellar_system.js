$(function() {
  var controls, camera, scene, renderer, container, intersects;
  circles = [];

  // Set up canvas dimensions
  var width = 1000;
  var height = window.innerHeight;

  // Set up tools for hover and click events
  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2(), INTERSECTED;
  
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
    camera = new THREE.PerspectiveCamera(75, width/height, 50, 1000);
    camera.position.set(0, 0, 100);
    scene.add(camera);

    // Set up camera controls (using Orbit)
    controls = new THREE.OrbitControls( camera );
    controls.rotateSpeed = 1;
    controls.minDistance = 100;
    controls.maxDistance = 500;

    // Create the WebGL renderer and append it to the DOM bia the body element
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Create and add the star to the stellar system
    addStar(star);

    // Circle
    var circleSegments = 64;
    var circleMaterial = new THREE.LineBasicMaterial( { color: 0xF0C400 } );

    // Create and add three planets to the stellar system
    for (planet where planet.star = star.pk in planets) {
      selectPlanet(planet);
    }
      

  //   t = 0;
  //   y1 = planet1.position.y;
  //   y2 = planet2.position.y;
  //   y3 = planet3.position.y;
  //   x = planet1.position.x;
  //   launch = Date.now();
  //   animate();

  // }

  // function animate() {
  //   requestAnimationFrame(animate);
  //   starmaterial.uniforms[ 'time' ].value = .00025 * ( Date.now() - launch );
  //   t += 0.01;
  //   star.rotation.z += 0.005;
  //   planet1.rotation.z += 0.03;
  //   planet2.rotation.z += 0.04;
  //   planet3.rotation.z += 0.05;

  //   planet1.position.y = y1 * Math.cos(t) + x * Math.sin(t);
  //   planet1.position.x = x * Math.cos(t) - y1 * Math.sin(t);

  //   planet2.position.y = y2 * Math.cos(t * 0.5) + x * Math.sin(t * 0.5);
  //   planet2.position.x = x * Math.cos(t * 0.5) - y2 * Math.sin(t * 0.5);

  //   planet3.position.y = y3 * Math.cos(t * 1.2) + x * Math.sin(t * 1.2);
  //   planet3.position.x = x * Math.cos(t * 1.2) - y3 * Math.sin(t * 1.2);

  //   renderer.render(scene, camera);
  //   controls.update();
  // }

  // add the star
  function addStar(star) {
    var geometry = new THREE.IcosahedronGeometry( star.stellar_radius * 10, 5 );
    starmaterial = new THREE.ShaderMaterial({
      uniforms: { 
        tExplosion: {
          type: "t", 
          value: Textures.sunexplocolor
        },
        time: { // float initialized to 0
          type: "f", 
          value: 0.0 
        }
      },

      vertexShader: document.getElementById( 'star-vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'star-fragmentShader' ).textContent
    });
    star = new THREE.Mesh( geometry, starmaterial );
    scene.add( star );
    pointLight = new THREE.PointLight( 0xffffff );
    scene.add( pointLight );
    pointLight.add( star );
  }

  // select which type of planet to add
  function selectPlanet(planet) {
    if (planet.planet_radius > 4) {
      addRed(planet);
    }
    else if (planet.planet_radius > 2) {
      addBlue(planet);
    }
    else {
      if (planet.surface_temp > 273 && planet.surface_temp < 373) {
        addHabitable(planet);
      }
      else { 
        addRocky(planet); 
      }
    }
  }

  // add Red Gas Planet
  function addRed(planet) {
    redMaterial = new THREE.ShaderMaterial({
      uniforms: { 
        tExplosion: {
          type: "t", 
          value: Textures.redexplocolor
        },
        time: {
          type: "f", 
          value: 0.0 
        }
      },
    vertexShader: document.getElementById( 'gas-vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'gas-fragmentShader' ).textContent
    });
    geometry = new THREE.IcosahedronGeometry( planet.planet_radius, 5 );
    planet = new THREE.Mesh( geometry, redMaterial );
    scene.add(planet);
    planet.position.set(0, planet.semimajor_axis * 100, 0);
    addCircle(planet.semimajor_axis * 100);
  }

  // add Blue Gas Planet
  function addBlue(planet) {
    blueMaterial = new THREE.ShaderMaterial({
      uniforms: { 
        tExplosion: {
          type: "t", 
          value: Textures.blueexplocolor
        },
        time: {
          type: "f", 
          value: 0.0 
        }
      },
    vertexShader: document.getElementById( 'gas-vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'gas-fragmentShader' ).textContent
    });
    geometry = new THREE.IcosahedronGeometry( planet.planet_radius, 5 );
    planet = new THREE.Mesh( geometry, blueMaterial );
    scene.add(planet);
    planet.position.set(0, planet.semimajor_axis * 100, 0);
    addCircle(planet.semimajor_axis * 100)
  }

  // add rocky planet
  function addRocky(planet) {
    geometry = new THREE.SphereGeometry(planet.planet_radius, 15, 15);
    rockyMaterial = new THREE.MeshPhongMaterial({ map: Textures.rockytexture, bumpMap: Textures.rockybump, bumpScale: 1  });
    planet1 = new THREE.Mesh(geometry, rockyMaterial);
    scene.add(planet1);
    planet1.position.set(0, planet.semimajor_axis * 100, 0);
    addCircle(planet.semimajor_axis * 100)
  }

  // add habitable planet
  function addHabitable(planet) {
    geometry = new THREE.SphereGeometry(planet.planet_radius, 15, 15);
    habitableMaterial = new THREE.MeshPhongMaterial({ map: Textures.habitabletexture, bumpMap: Textures.habitablebump, bumpScale: 1  });
    planet1 = new THREE.Mesh(geometry, habitableMaterial);
    scene.add(planet1);
    planet1.position.set(0, planet.semimajor_axis * 100, 0);
    addCircle(planet.semimajor_axis * 100)
  }

  // add a orbit circle to the planet
  function addCircle(distance) {
    geometry = new THREE.CircleGeometry( distance, circleSegments );
    geometry.vertices.shift();
    circle = new THREE.Line(geometry,  circleMaterial);
    circles.push(circle);
    scene.add(circle);
  }

  // Make the planets clickable (for now, it alerts the coordinates)
  document.addEventListener('dblclick', onDocumentMouseClick, false);
  function onDocumentMouseClick() {
    event.preventDefault();
    grabPlanets();
    if (intersects.length > 0) {
      alert(intersects[0].object);
    }
    if (intersects.length == 0) {
      console.log(camera.position);
      if (camera.position.z == 75) { camera.position.set(0, 75, 0); }
      else if (Math.round(camera.position.y) == 75) { camera.position.set(0, -60, 60); }
      else { camera.position.set(0, 0, 75); }
    }
  }

  // Deactivate orbit controls when interacting with the panel
  // Show/hide orbit circles
  $('.sidebar').on('mouseenter', function() {
    controls.enabled = false;
    skybox_controls.enabled = false;
    circles.map(function(circle){circle.visible = false});
  });

  $('.sidebar').on('mouseleave', function() {
    controls.enabled = true;
    skybox_controls.enabled = true;
    circles.map(function(circle){circle.visible = true});
  });

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
});