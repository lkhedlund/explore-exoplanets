var gasPlanet = function(radius, textureColour) {
  var container, winResize;
  var camera, scene, renderer, controls;
  var fov = 25;
  var start = Date.now();

  // Set up canvas dimensions
  var windowwidth = window.innerWidth;
  var width = windowwidth * 0.66667;
  var height = window.innerHeight;

  init(radius, textureColour);

  function init(radius, textureColour){
    //set up scene and camera
    container = document.getElementById( 'space_container' );
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(width, height);
    camera = new THREE.PerspectiveCamera(fov, width/ height, 50, 10000 );
    camera.position.z = 100;
    scene.add( camera );
    //move the camera around
    controls = new THREE.OrbitControls( camera );
    controls.minDistance = 100;
    controls.maxDistance = 400;
    //light
    var amlight = new THREE.AmbientLight( 0x888888 )
    scene.add( amlight );

    var dirlight = new THREE.DirectionalLight( 0xcccccc, 1 )
    dirlight.position.set(10,3,5)
    scene.add( dirlight );

    //NOTE: Previously Textures.blueexplocolor or Textures.redexplocolor
    var planetmaterial = new THREE.ShaderMaterial({
      uniforms: {
        tExplosion: {
          type: "t",
          value: textureColour
        },
        // float initialized to 0
        time: {
          type: "f",
          value: 0.0
        }
      },
      vertexShader: document.getElementById( 'gas-vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'gas-fragmentShader' ).textContent
    });

    var geometry = new THREE.IcosahedronGeometry( 15, 5 );
    var gas_planet = new THREE.Mesh( geometry, planetmaterial );
    scene.add(gas_planet);


    container.appendChild( renderer.domElement );
    animate();

    function animate() {
      requestAnimationFrame(animate);
      planetmaterial.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
      gas_planet.rotateY(2/1000);
      controls.update();
      //resizes canvas when window is
      winResize = new THREEx.WindowResize(renderer, camera);
      renderer.render( scene, camera );
    }
  }
};
