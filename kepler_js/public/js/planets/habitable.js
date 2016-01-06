$(function() {
  var container, stats;
  var camera, scene, renderer, controls;
  var texloader = new THREE.TextureLoader();
  var texture = texloader.load('public/images/plutomap2k.jpg');
  var bump = texloader.load('public/images/plutobump2k.jpg');

  init();

  function init(){
    //set up scene and camera
    container = document.getElementById( 'space_container' );
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 10000);
    camera.position.z = 1;
    scene.add( camera );

    //control camera
    controls = new THREE.OrbitControls( camera );
    controls.minDistance = 1;
    controls.maxDistance = 2000;

    //light
    var amlight = new THREE.AmbientLight( 0x888888 )
    scene.add( amlight );
    var dirlight = new THREE.DirectionalLight( 0xcccccc, 1 )
    dirlight.position.set(10,3,5)
    scene.add( dirlight );

    //rockyplanet
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.02 });
    var geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
    var rockyplanet = new THREE.Mesh( geometry, material );
    scene.add(rockyplanet);

    container.appendChild( renderer.domElement );
    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update;
    renderer.render( scene, camera );
  }
});
