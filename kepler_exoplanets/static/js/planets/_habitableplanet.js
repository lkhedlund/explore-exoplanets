$(function() {
  var container;
  var camera, scene, renderer, controls;
  var fov = 25;

  // Set up canvas dimensions
  var width = 1500;
  var height = window.innerHeight;

  init();

  function init(){
    //set up scene and camera
    container = document.getElementById( 'space_container' );
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(width, height);
    camera = new THREE.PerspectiveCamera(fov, width/ height, 50, 10000);
    camera.position.z = 100;
    scene.add( camera );
    //control camera
    controls = new THREE.OrbitControls( camera );
    controls.minDistance = 100;
    controls.maxDistance = 400;
    //light
    var amlight = new THREE.AmbientLight( 0x888888 )
    scene.add( amlight );
    var dirlight = new THREE.DirectionalLight( 0xcccccc, 1 )
    dirlight.position.set(10,3,5)
    scene.add( dirlight );
    //habitableplanet
    var material = new THREE.MeshPhongMaterial({ map: Textures.habitabletexture, bumpMap: Textures.habitablebump, bumpScale: 0.50 });
    var geometry = new THREE.SphereGeometry( 20, 32, 32 );
    var habitableplanet = new THREE.Mesh( geometry, material );
    scene.add(habitableplanet);

    container.appendChild( renderer.domElement );
    animate();

    function animate() {
      requestAnimationFrame(animate);
      controls.update();
      habitableplanet.rotateY(2/1000);
      renderer.render( scene, camera );
    }
  }
});