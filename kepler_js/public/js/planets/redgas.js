$(function() {
  var container, stats;
  var camera, scene, renderer, controls;
  var fov = 25;
  var start = Date.now()

  init();

  function init(){
    //set up scene and camera
    container = document.getElementById( 'space_container' );
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(1000, window.innerHeight);
    camera = new THREE.PerspectiveCamera(fov, 1000/ window.innerHeight, 50, 10000);
    camera.position.z = 100;
    camera.target = new THREE.Vector3( 0, 0, 0 );
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
    //gasplanet
    planetmaterial = new THREE.ShaderMaterial({
      uniforms: {
        tExplosion: {
          type: "t",
          value: Textures.redexplocolor
        },
        time: { // float initialized to 0
          type: "f",
          value: 0.0
        }
      },
      vertexShader: document.getElementById( 'gas-vertexShader' ).textContent,
      fragmentShader: document.getElementById( 'gas-fragmentShader' ).textContent
    });
    var geometry = new THREE.IcosahedronGeometry( 20, 5 );
    var gasplanet = new THREE.Mesh( geometry, planetmaterial );
    scene.add(gasplanet);

    container.appendChild( renderer.domElement );
    animate();

    function animate() {
      requestAnimationFrame(animate);
      planetmaterial.uniforms[ 'time' ].value = .00025 * ( Date.now() - start );
      gasplanet.rotateY(2/1000)
      controls.update();
      renderer.render( scene, camera );
    }
  }
});