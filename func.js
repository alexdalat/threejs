
function randHex() {
	return "0x"+Math.floor(Math.random()*16777215).toString(16);
}
function lightBall(light, color) {
	// create "light-ball" meshes
	var sphereGeometry = new THREE.SphereGeometry( 75, 16, 8 );
	var darkMaterial = new THREE.MeshBasicMaterial( { color: 0x0c0c0c } );
	var wireframeMaterial = new THREE.MeshBasicMaterial( 
		{ color: color, wireframe: true, transparent: true } ); 
	var shape = THREE.SceneUtils.createMultiMaterialObject( 
		sphereGeometry, [ darkMaterial, wireframeMaterial ] );
	shape.position.x = light.position.x;
	shape.position.y = light.position.y;
	shape.position.z = light.position.z;
	scene.add( shape );
	return shape;
}
function shadowConfig(light) {
	//Set up shadow properties for the light
	light.shadow.mapSize.width = 1024;  // Higher = more detail
	light.shadow.mapSize.height = 1024; // Higher = more detail
	light.shadow.camera.near = 0.5; // default
	light.shadow.camera.far = 20000;
}
function lightHelper(light) {
	//Create a helper for the shadow camera (optional)
	if(!helpers)return;
	var helper;
	var size = 500;
	switch(light.type) {
		case "PointLight":
			helper = new THREE.PointLightHelper( light, light.distance);
			break;
		case "SpotLight":
			helper = new THREE.SpotLightHelper( light );
			break;
		case "DirectionalLight":
			helper = new THREE.DirectionalLightHelper( light, size );
			break;
		case "HemisphereLight":
			helper = new THREE.HemisphereLightHelper( light, size );
			break;
		case "RectAreaLight":
			helper = new THREE.RectAreaLightHelper( light );
			break;
		default:
			helper = new THREE.CameraHelper(light);
	}
	scene.add( helper );
}