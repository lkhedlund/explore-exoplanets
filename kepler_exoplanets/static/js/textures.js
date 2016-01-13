var Textures = (function() {
  var texloader = new THREE.TextureLoader();
  var api = {
    redexplocolor:texloader.load('/static/images/redgas.png'),
    blueexplocolor:texloader.load('/static/images/bluegas.png'),
    rockytexture:texloader.load('/static/images/rocky.jpg'),
    rockybump:texloader.load('/static/images/rockybump.jpg'),
    habitabletexture:texloader.load('/static/images/habitableplanet.png'),
    habitablebump:texloader.load('/static/images/habitableplanetbump.png'),
    sunexplocolor:texloader.load('/static/images/star.png'),
    glow:texloader.load( '/static/images/glow.png' ),
    skybox_classic_bk: texloader.load( '/static/images/skybox/bluenebulaBK.png' ),
    skybox_classic_dn: texloader.load( '/static/images/skybox/bluenebulaDN.png' ),    
    skybox_classic_ft: texloader.load( '/static/images/skybox/bluenebulaFT.png' ),
    skybox_classic_lf: texloader.load( '/static/images/skybox/bluenebulaLF.png' ),
    skybox_classic_rt: texloader.load( '/static/images/skybox/bluenebulaRT.png' ),    
    skybox_classic_up: texloader.load( '/static/images/skybox/bluenebulaUP.png' ),
    skybox_index_bk: texloader.load( '/static/images/skybox/skyindexBK.png' ),
    skybox_index_dn: texloader.load( '/static/images/skybox/skyindexDN.png' ),    
    skybox_index_ft: texloader.load( '/static/images/skybox/skyindexFT.png' ),
    skybox_index_lf: texloader.load( '/static/images/skybox/skyindexLF.png' ),
    skybox_index_rt: texloader.load( '/static/images/skybox/skyindexRT.png' ),    
    skybox_index_up: texloader.load( '/static/images/skybox/skyindexUP.png' ),
  }
  return api;
})();

var Planet = (function() {

})();  
