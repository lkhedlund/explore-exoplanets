  var camera, scene, renderer, stats;
  var texloader = new THREE.TextureLoader();

  var sky_bk = texloader.load( '../public/images/skybox/stars_bk.jpg' );
  var sky_dn = texloader.load( '../public/images/skybox/stars_dn.jpg' );
  var sky_fr = texloader.load( '../public/images/skybox/stars_fr.jpg' );
  var sky_lf = texloader.load( '../public/images/skybox/stars_lf.jpg' );
  var sky_rt = texloader.load( '../public/images/skybox/stars_rt.jpg' );
  var sky_up = texloader.load( '../public/images/skybox/stars_up.jpg' );

  $(function() {

  init();

  function init(){
    //set up scene and camera
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //field_of_view, aspect_ratio, near_clip, far_clip
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);
    camera.position.set(0, 100, 200);
    camera.lookAt(scene.position);
    scene.add( camera );

    // helps keep track of skybox side when testing
    var axes = new THREE.AxisHelper(100);
    scene.add(axes);

    // camera movement
    skybox_controls = new THREE.OrbitControls( camera );
      skybox_controls.minDistance = 100;
      skybox_controls.maxDistance = 1000;

    //box sides
    var materialArray = [];
      materialArray.push(new THREE.MeshBasicMaterial( { map: sky_bk }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: sky_dn }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: sky_fr }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: sky_lf }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: sky_rt }));
      materialArray.push(new THREE.MeshBasicMaterial( { map: sky_up }));

    for (var i = 0; i < 6; i++){
       materialArray[i].side = THREE.BackSide;
    }
    var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyboxGeom = new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1 );
    var skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
    scene.add( skybox );

    document.body.appendChild( renderer.domElement );
    animate();
  }

  function animate() {
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
  }
});
