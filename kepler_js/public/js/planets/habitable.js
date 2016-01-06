$(function() {
  var container, stats;
  var camera, scene, renderer, controls;
  var texloader = new THREE.TextureLoader();
  var fov = 25;
  var habitabletexture = texloader.load('/public/images/habitableplanet.png');
  var habitablebump = texloader.load('/public/images/habitableplanetbump.png');

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
    //rockyplanet
    var material = new THREE.MeshPhongMaterial({ map: habitabletexture, bumpMap: habitablebump, bumpScale: 0.50 });
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