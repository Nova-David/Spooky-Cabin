import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'
import { Sky } from 'three/addons/objects/Sky.js'

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// Floor
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp");
const floorColorTexture = textureLoader.load("./floor/snow/color.webp");
const floorARMTexture = textureLoader.load("./floor/snow/arm.webp");
const floorDisplacementTexture = textureLoader.load("./floor/snow/disp.webp");
const floorNormalTexture = textureLoader.load("./floor/snow/normal.webp");
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

const wallColorTexture = textureLoader.load("./wall/wood/color.webp");
const wallARMTexture = textureLoader.load("./wall/wood/arm.webp");
const wallNormalTexture = textureLoader.load("./wall/wood/normal.webp");
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

const roofColorTexture = textureLoader.load("./roof/reed/color.webp");
const roofARMTexture = textureLoader.load("./roof/reed/arm.webp");
const roofNormalTexture = textureLoader.load("./roof/reed/normal.webp");
roofColorTexture.colorSpace = THREE.SRGBColorSpace;
console.log(roofColorTexture);


roofARMTexture.repeat.set(3, 1);
roofNormalTexture.repeat.set(3, 1);

roofARMTexture.wrapS = THREE.RepeatWrapping;
roofNormalTexture.wrapS = THREE.RepeatWrapping;

const bushColorTexture = textureLoader.load("./bush/leaves/color.webp");
const bushARMTexture = textureLoader.load("./bush/leaves/arm.webp");
const bushNormalTexture = textureLoader.load("./bush/leaves/normal.webp");
bushColorTexture.colorSpace = THREE.SRGBColorSpace;

bushColorTexture.repeat.set(2, 1);
bushARMTexture.repeat.set(2, 1);
bushNormalTexture.repeat.set(2, 1);

bushColorTexture.wrapS = THREE.RepeatWrapping;
bushARMTexture.wrapS = THREE.RepeatWrapping;
bushNormalTexture.wrapS = THREE.RepeatWrapping;

const graveColorTexture = textureLoader.load("./grave/plastered/color.webp");
const graveARMTexture = textureLoader.load("./grave/plastered/arm.webp");
const graveNormalTexture = textureLoader.load("./grave/plastered/normal.webp");
graveColorTexture.colorSpace = THREE.SRGBColorSpace;

graveColorTexture.repeat.set(0.3, 0.4);
graveARMTexture.repeat.set(0.3, 0.4);
graveNormalTexture.repeat.set(0.3, 0.4);

const doorAlphaTexture = textureLoader.load("./door/alpha.webp");
const doorColorTexture = textureLoader.load("./door/color.webp");
const doorAOTexture = textureLoader.load("./door/ambientOcclusion.webp");
const doorDisplacementTexture = textureLoader.load("./door/height.webp");
const doorNormalTexture = textureLoader.load("./door/normal.webp");
const doorMetalnessTexture = textureLoader.load("./door/metalness.webp");
const doorRoughnessTexture = textureLoader.load("./door/roughness.webp");
doorColorTexture.colorSpace = THREE.SRGBColorSpace;




/**
 * Base
 */
// Debug
const gui = new GUI()
gui.hide();

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * House
 */

// floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),
    new THREE.MeshStandardMaterial({
        transparent: true,
        alphaMap: floorAlphaTexture,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.34,
        displacementBias: -0.026
    })
);
floor.rotation.x = -Math.PI/2;
scene.add(floor);

// house
const house = new THREE.Group();
scene.add(house);

const body = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        color: 0xaa0077,
        map: wallColorTexture,
        aoMap: wallARMTexture,
        metalnessMap: wallARMTexture,
        roughnessMap: wallARMTexture,
        normalMap: wallNormalTexture,
        // displacementMap: wallDisplacementTexture
    })
);
body.position.y = 2.5/2;
house.add(body);

// gui.add(body.material, "displacementScale").min(0).max(1).step(0.001).name("body Displacement Scale");
// gui.add(body.material, "displacementBias").min(-1).max(1).step(0.001).name("body Displacement Bias");

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        color: 0xeeeeff,
        // map: roofColorTexture,
        aoMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    }) 
);
roof.rotation.y = Math.PI/4;
roof.position.y = 1.5/2 + 2.5;
house.add(roof);

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        color: 0x995555,
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAOTexture,
        displacementMap: doorDisplacementTexture,
        displacementScale: 0.05,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
);
door.position.z = 2 + 0.01;
door.position.y = 2.2/2 - 0.1;
house.add(door);

// bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
    // color: "#aaccff",
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
});

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.position.set(0.8, 0.2, 2.2);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.rotation.x = -0.75;

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.position.set(1.4, 0.1, 2.1);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.rotation.x = -0.75;

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.position.set(-0.8, 0.1, 2.2);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.rotation.x = -0.75;

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.position.set(-1, 0.05, 2.6);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.rotation.x = -0.75;

house.add(bush1, bush2, bush3, bush4);

// graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
});

const graves = new THREE.Group();
scene.add(graves);

let totalGraves = 30;
for (let i = 0; i < totalGraves; i++) {
    const grave = new THREE.Mesh(graveGeometry, graveMaterial);
    graves.add(grave);

    const theta = Math.random() * 2 * Math.PI;
    const r = Math.random() * 4 + 3;

    grave.position.x = r * Math.cos(theta);
    grave.position.y = Math.random() * 0.4;
    grave.position.z = r * Math.sin(theta);
    grave.rotation.x = (Math.random() - 0.5) * 0.3;
    grave.rotation.y = (Math.random() - 0.5) * 0.3;
    grave.rotation.z = (Math.random() - 0.5) * 0.3;

}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const pointLight = new THREE.PointLight(0xff7d46, 4);
house.add(pointLight);
pointLight.position.y = 2.2;
pointLight.position.z = 2.5;

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 1);
// scene.add(directionalLightHelper);

/**
 * Ghosts
 */

const ghost1 = new THREE.PointLight(0x8800ff, 6);
const ghost2 = new THREE.PointLight(0xff0088, 6);
const ghost3 = new THREE.PointLight(0xff0000, 6);
ghost1.position.y = 0.5;
ghost2.position.y = 0.5;
ghost3.position.y = 0.5;
scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

/**
 * Shadows
 */

// Cast and receive
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

body.castShadow = true;
body.receiveShadow = true;
roof.castShadow = true;
floor.receiveShadow = true;

for(const grave of graves.children) {
    grave.castShadow = true;
    grave.receiveShadow = true;
}

/**
 * Mapping
 */
directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

/**
 * Sky
 */
const sky = new Sky();
sky.scale.set(100, 100, 100);
scene.add(sky);

sky.material.uniforms['turbidity'].value = 10;
sky.material.uniforms['rayleigh'].value = 3;
sky.material.uniforms['mieCoefficient'].value = 0.1;
sky.material.uniforms['mieDirectionalG'].value = 0.95;
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95);

// gui.add(sky.material.uniforms.turbidity, "value").min(0).max(50).step(0.01);
// gui.add(sky.material.uniforms.rayleigh, "value").min(0).max(50).step(0.01);
// gui.add(sky.material.uniforms.mieCoefficient, "value").min(0).max(2).step(0.001);

/**
 * Fog
 */
scene.fog = new THREE.FogExp2("#04343f", 0.1);

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Ghost
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle * 0.5) * 4;
    ghost1.position.z = Math.sin(ghost1Angle * 0.5) * 4;
    ghost1.position.y = Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45) + 0.5;

    const ghost2Angle = -elapsedTime * 0.38;
    ghost2.position.x = Math.cos(ghost2Angle * 0.5) * 5;
    ghost2.position.z = Math.sin(ghost2Angle * 0.5) * 5;
    ghost2.position.y = Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 1.37) * Math.sin(ghost2Angle * 1.98) + 0.5;
    
    const ghost3Angle = elapsedTime * 0.23;
    ghost3.position.x = Math.cos(ghost3Angle * 0.5) * 6;
    ghost3.position.z = Math.sin(ghost3Angle * 0.5) * 6;
    ghost3.position.y = Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 1.37) * Math.sin(ghost3Angle * 1.98) + 0.2;

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()