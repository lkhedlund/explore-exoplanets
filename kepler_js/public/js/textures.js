//loads all the textures to be called in appropriate renderings
var Textures = (function() {
  var texloader = new THREE.TextureLoader();
  var api = {
    redexplocolor:texloader.load('/public/images/redgas.png'),
    blueexplocolor:texloader.load('/public/images/bluegas.png'),
    rockytexture:texloader.load('/public/images/rocky.jpg'),
    rockybump:texloader.load('/public/images/rockybump.jpg'),
    habitabletexture:texloader.load('/public/images/habitableplanet.png'),
    habitablebump:texloader.load('/public/images/habitableplanetbump.png'),
    sunexplocolor:texloader.load('/public/images/star.png'),
    glow:texloader.load( '/public/images/glow.png' )
  }
  return api;
})();
