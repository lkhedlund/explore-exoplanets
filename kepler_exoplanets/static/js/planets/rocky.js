var planet = function() {
  console.log("Load within planet...")
  var container;
  var camera, scene, renderer, controls;
  var group;
  var texloader = new THREE.TextureLoader();
  var texture = texloader.load('/static/images/rocky.jpg');
  var bump = texloader.load('/static/images/plutobump2k.jpg');

  init();

  function init(){
    //set up scene and camera
    container = document.getElementById( 'space_container' );
    scene = new THREE.Scene();
    group = new THREE.Group();
    renderer = new THREE.WebGLRenderer({alpha: true});
    renderer.setClearColor( 0xffffff, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 10000);
    camera.position.z = 1;
    scene.add( group );
    group.add(camera);

    //control camera
    controls = new THREE.OrbitControls( camera );
    controls.minDistance = 1;
    controls.maxDistance = 1000;

    //light
    var amlight = new THREE.AmbientLight( 0x888888 )
    group.add( amlight );

    var dirlight = new THREE.DirectionalLight( 0xcccccc, 1 )
    dirlight.position.set(10,3,5)
    group.add( dirlight );

    //rockyplanet
    var material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: bump, bumpScale: 0.02 });
    var geometry = new THREE.SphereGeometry( 0.5, 32, 32 );
    var rockyplanet = new THREE.Mesh( geometry, material );
    group.add(rockyplanet);


    container.appendChild( renderer.domElement );
    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    controls.update;
    renderer.render( scene, camera );
  }
});
