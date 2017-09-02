
const THREE = require('three')
const THREEx = require('../index')
var renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('canvas'), antialias: true, alpha: true });
// renderer.setClearColor('#FFF', 0)
// gl.clear(gl.COLOR_BUFFER_BIT);
var onRenderFcts = [];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, 1, 0.5, 5);
camera.position.z = 3;
//////////////////////////////////////////////////////////////////////////////////
//		load Character							//
//////////////////////////////////////////////////////////////////////////////////


var character = new THREEx.PlayerModel()
character.root.translateY(-0.5)
scene.add(character.root)
let vec = character.root.position
camera.lookAt(new THREE.Vector3(0, 0, 0))


requestAnimationFrame(function animate(nowMsec) {
    // keep looping
    requestAnimationFrame(animate);
    // measure time
    // controls.update()
    renderer.render(scene, camera);
    character.root.rotation.y += 0.01;
})

