var skybox_camera, scene, renderer,skybox, skybox_controls;
var fov = 25;
var texloader = new THREE.TextureLoader();

var sky_bk = Textures.skybox_classic_bk
var sky_dn = Textures.skybox_classic_dn
var sky_ft = Textures.skybox_classic_ft
var sky_lf = Textures.skybox_classic_lf
var sky_rt = Textures.skybox_classic_rt
var sky_up = Textures.skybox_classic_up

$(function() {

  init();

  function init(){
    //set up scene and camera
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //field_of_view, aspect_ratio, near_clip, far_clip
    skybox_camera = new THREE.PerspectiveCamera(fov, window.innerWidth/ window.innerHeight, 50, 10000);
    skybox_camera.position.set(0, 0, 3000);
    skybox_camera.lookAt(scene.position);
    scene.add( skybox_camera );

    // helps keep track of skybox side when testing
    // var axes = new THREE.AxisHelper(100);
    // scene.add(axes);

    // camera movement
    skybox_controls = new THREE.OrbitControls( skybox_camera );
    skybox_controls.minDistance = 3000;
    skybox_controls.maxDistance = 4000;

    //box sides
    var materialArray = [];
    materialArray.push(new THREE.MeshBasicMaterial( { map: sky_bk }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: sky_ft }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: sky_up }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: sky_dn }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: sky_rt }));
    materialArray.push(new THREE.MeshBasicMaterial( { map: sky_lf }));

    for (var i = 0; i < 6; i++){
       materialArray[i].side = THREE.BackSide;
    }
    var skyboxMaterial = new THREE.MeshFaceMaterial( materialArray );
    var skyboxGeom = new THREE.CubeGeometry( 5000, 5000, 5000, 1, 1, 1 );
    var skybox = new THREE.Mesh( skyboxGeom, skyboxMaterial );
    scene.add( skybox );

    document.body.appendChild( renderer.domElement );
    animate();

    window.addEventListener('resize', function() {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);
      skybox_camera.aspect = width / height;
      skybox_camera.updateProjectionMatrix();
    });

    function animate() {
      requestAnimationFrame(animate);
      skybox.rotateY(-0.5/1000);
      renderer.render( scene, skybox_camera );
    }
    
    window.skybox_camera = skybox_camera;
    window.skybox = skybox;
    window.skybox_controls = skybox_controls;
  }
});
