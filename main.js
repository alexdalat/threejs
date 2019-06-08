// create an empty scene
var scene = new THREE.Scene();

var helpers = false;

camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);
camera.position.x = 2000;
camera.position.y = 1000;
camera.position.z = 2000;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.soft = true;
// shadowMaps: PCFSoftShadowMap, BasicShadowMap
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // "shader pack"
// Gamma
renderer.gammaInput = true;
renderer.gammaOutput = true;

document.getElementById('ThreeJS').appendChild( renderer.domElement );

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.enableDamping = true;
controls.dampingFactor = 1;
controls.zoomSpeed = 1.75;
controls.enableZoom = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 1;
controls.target.set( 0, 450, 0 ); // where to look at


// ** SCENE EXTRAS ** //

//scene.add( new THREE.AxesHelper() );

renderer.setClearColor(0x21252d); // background

// add subtle ambient lighting
var ambiColor = 0x0c0c0c;
var ambientLight = new THREE.AmbientLight(ambiColor);
scene.add(ambientLight);

scene.fog = new THREE.FogExp2( 0x9999ff, 0.00015 );

/*var gridXZ = new THREE.GridHelper(3000, 10, 0xff0000, 0xcccccc); // size, amount of rows/colums
gridXZ.position.y = -150;
scene.add(gridXZ);*/



// ** LIGHTS ** //
var d = 800;
var dirlight = new THREE.DirectionalLight(0xc8c8c8);
dirlight.intensity = 0.15;
dirlight.position.set(-750,1050,750);
dirlight.target.position.set(0,0,0);
scene.add( dirlight.target );
scene.add( dirlight );
dirlight.castShadow = true;
dirlight.intensity = 1;
dirlight.shadow.camera.left = -d;
dirlight.shadow.camera.right = d;
dirlight.shadow.camera.top = d;
dirlight.shadow.camera.bottom = -d;
shadowConfig(dirlight);
lightHelper(dirlight);
lightBall(dirlight, dirlight.color);

// point light
var pointColor = 0xff0000;
var pointLight = new THREE.PointLight(pointColor);
pointLight.distance = 3000;
pointLight.intensity = 2;
pointLight.penumbra = 0;
pointLight.position.set(-550,250,-550);
pointLight.castShadow = true;
scene.add(pointLight);
shadowConfig(pointLight);
lightHelper(pointLight);
var ball = lightBall(pointLight, pointLight.color);

var pivot2 = new THREE.Group();
scene.add( pivot2 );
pivot2.add( pointLight );
pivot2.add( ball );


// spotlight #1 -- yellow
var spotlight = new THREE.SpotLight(0x00ff00);
spotlight.position.set(550,1050,-550);
spotlight.intensity = 1;
spotlight.angle = 0.6;
spotlight.penumbra = 0.75; // softing edge
// must enable shadow casting ability for the light
spotlight.castShadow = true;
spotlight.target.position.set( 0, 450, 0 );
scene.add(spotlight.target);
scene.add(spotlight);
shadowConfig(spotlight);
lightHelper(spotlight);
var ball = lightBall(spotlight, spotlight.color);

var pivot = new THREE.Group();
scene.add( pivot );
pivot.add( spotlight );
pivot.add( ball );


// ** OBJECTS ** //

// ground
var planeSize = 3000;
/*
var loader = new THREE.TextureLoader();
var texture = loader.load('checker.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.magFilter = THREE.NearestFilter;
var repeats = 15;
texture.repeat.set(repeats, repeats);
var material = new THREE.MeshPhongMaterial({
	map: texture,
	side: THREE.DoubleSide,
});*/
var geometry = new THREE.PlaneBufferGeometry(planeSize, planeSize);
var material = new THREE.MeshPhongMaterial({color:0xffffff, side: THREE.DoubleSide});
var floor = new THREE.Mesh( geometry, material );
floor.rotateX( - Math.PI / 2);
floor.position.set(0,-200,0);
floor.receiveShadow = true;
scene.add(floor);

//cube
var geometry = new THREE.BoxGeometry( 500, 500, 500 );
var material = new THREE.MeshPhongMaterial({color:0x888888}); // material that light can interact with
var cube = new THREE.Mesh( geometry, material );
cube.position.set(0,200,0);
cube.receiveShadow = true;
cube.castShadow = true;
scene.add( cube );

var lastUpdate = Date.now();
var speed = 55; // lower = faster
var speed2 = 85; // lower = faster
function animate() {
	requestAnimationFrame( animate );
	
    var now = Date.now();
    var dt = now - lastUpdate;
    lastUpdate = now;
	pivot.rotation.y += 0.05 * (dt/speed);
	pivot2.rotation.y += 0.05 * (dt/speed2);
	dirlight.rotation.y += 0.05 * (dt/2);
	
	controls.update();
	renderer.render( scene, camera );
}

function render(){
	renderer.render( scene, camera );
}

animate();