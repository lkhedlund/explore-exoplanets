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
    glow:texloader.load( '/static/images/glow.png' )
  }
  return api;
})();

var Planet = (function() {

})();  
