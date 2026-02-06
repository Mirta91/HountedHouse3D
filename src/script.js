import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Sky } from 'three/addons/objects/Sky.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


// Textures
const textureLoader = new THREE.TextureLoader()
const fireflyTexture = textureLoader.load('./firefly.png')
const floorAlphaTexture = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/forest_leaves_02_1k/forest_leaves_02_diffuse_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/forest_leaves_02_1k/forest_leaves_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/forest_leaves_02_1k/forest_leaves_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/forest_leaves_02_1k/forest_leaves_02_disp_1k.jpg')

floorColorTexture.repeat.set(4, 4)
floorARMTexture.repeat.set(4, 4)
floorNormalTexture.repeat.set(4, 4)
floorDisplacementTexture.repeat.set(4, 4)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

floorColorTexture.colorSpace = THREE.SRGBColorSpace


// wall textures
/* const wallColorTexture = textureLoader.load('./wall/worn_mossy_plasterwall_1k/worn_mossy_plasterwall_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/worn_mossy_plasterwall_1k/worn_mossy_plasterwall_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/worn_mossy_plasterwall_1k/worn_mossy_plasterwall_nor_gl_1k.jpg')
const wallDisplacementTexture = textureLoader.load('./wall/worn_mossy_plasterwall_1k/worn_mossy_plasterwall_disp_1k.jpg')
 */
const wallColorTexture2 = textureLoader.load('./wall/cracked_concrete_wall_1k/cracked_concrete_wall_diff_1k.jpg')
const wallARMTexture2 = textureLoader.load('./wall/cracked_concrete_wall_1k/cracked_concrete_wall_arm_1k.jpg')
const wallNormalTexture2 = textureLoader.load('./wall/cracked_concrete_wall_1k/cracked_concrete_wall_nor_gl_1k.jpg')

wallColorTexture2.colorSpace = THREE.SRGBColorSpace

const roofColorTexture = textureLoader.load('./roof/clay_roof_tiles_1k/clay_roof_tiles_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/clay_roof_tiles_1k/clay_roof_tiles_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/clay_roof_tiles_1k/clay_roof_tiles_nor_gl_1k.jpg')
const roofDisplacementTexture = textureLoader.load('./roof/clay_roof_tiles_1k/clay_roof_tiles_disp_1k.jpg')

roofColorTexture.repeat.set(4, 1)
roofARMTexture.repeat.set(4, 1)
roofNormalTexture.repeat.set(4, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bush
const bushColorTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.jpg')
const bushARMTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.jpg')
const bushNormalTexture = textureLoader.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.jpg')

bushColorTexture.colorSpace = THREE.SRGBColorSpace

bushColorTexture.repeat.set(2, 1)
bushARMTexture.repeat.set(2, 1)
bushNormalTexture.repeat.set(2, 1)

bushColorTexture.wrapS = THREE.RepeatWrapping
bushARMTexture.wrapS = THREE.RepeatWrapping
bushNormalTexture.wrapS = THREE.RepeatWrapping

// Grave
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace


// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 100, 100),

    new THREE.MeshStandardMaterial(
        {
            alphaMap: floorAlphaTexture,   
            transparent: true,
            map: floorColorTexture,
            aoMap: floorARMTexture,
            roughnessMap: floorARMTexture,
            metalnessMap: floorARMTexture,
            normalMap: floorNormalTexture,
            displacementMap: floorDisplacementTexture,
            displacementScale: 0.3,
            displacementBias: -0.1

        }
    )
)
floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

// Walls
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial(
         {
            map: wallColorTexture2,
            aoMap: wallARMTexture2,
            roughnessMap: wallARMTexture2,
            metalnessMap: wallARMTexture2,
            normalMap: wallNormalTexture2

        }
    )
)
walls.position.y = 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.2, 1.7, 4),
  new THREE.MeshStandardMaterial(  {
    map: roofColorTexture,
    aoMap: roofARMTexture,
    roughnessMap: roofARMTexture,
    metalnessMap: roofARMTexture,
    normalMap: roofNormalTexture,
    displacementMap: roofDisplacementTexture,       
        displacementScale: 0.1,
        displacementBias: -0.05
})
);

roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

// Bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushColorTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNormalTexture
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.rotation.x = - 0.75
bush1.position.x = 1.2
bush1.position.z = 2.5
bush1.position.y = 0.2

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.3, 0.3, 0.3)
bush2.rotation.x = - 0.75
bush2.position.x = 1.8
bush2.position.z = 2.5
bush2.position.y = 0.2

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.rotation.x = - 0.75
bush3.position.x = - 1.8
bush3.position.z = 2.8
bush3.position.y = 0.2

house.add(bush1, bush2, bush3)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
})
const graves = new THREE.Group()
scene.add(graves)

for (let i = 0; i < 20; i++) {
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    let x, z

    do {
        x = (Math.random() - 0.5) * 14
        z = (Math.random() - 0.5) * 14
    } while (Math.sqrt(x * x + z * z) < 4) // 4 = center radius to avoid

    grave.position.set(
        x,
        Math.random() * 0.4,
        z
    )

    graves.add(grave)
}
// Fireflies
const fireflies = new THREE.Group()
scene.add(fireflies)

for (let i = 0; i < 10; i++) {
    const firefly = new THREE.PointLight('#fff672', 1.5, 6, 2)

    firefly.position.set(
        (Math.random() - 0.5) * 12,
        1.5 + Math.random(),
        (Math.random() - 0.5) * 12
    )

    const sprite = new THREE.Sprite(
        new THREE.SpriteMaterial({
            map: fireflyTexture,
            color: 0xfff672,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })
    )
    
    const size = 0.1 + Math.random() * 0.15
    sprite.scale.set(size, size, 1)
    firefly.add(sprite)

    // Firefly behavior data
    firefly.userData = {
        angle: Math.random() * Math.PI * 2,
        speed: 0.2 + Math.random() * 0.5,
        radius: 0.5 + Math.random() * 1.5,
        heightOffset: Math.random() * Math.PI * 2
    }

    fireflies.add(firefly)
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

// Point light
const pointLight = new THREE.PointLight('#ff7d46', 2, 7, 5)
pointLight.position.set(0, 2.3, 2.7)
house.add(pointLight)

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

//activate shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
fireflies.castShadow = true
house.children.forEach(child => child.castShadow = true)
house.children.forEach(child => child.receiveShadow = true)
floor.receiveShadow = true 

for(const grave of graves.children) {
    grave.castShadow = true
    grave.receiveShadow = true
}

//optimize shadows
directionalLight.shadow.mapSize.width = 256 
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20
directionalLight.shadow.camera.left = -8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.top = 15
directionalLight.shadow.camera.bottom = -8

const sky = new Sky()
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)
sky.scale.set(50, 50, 50)
scene.add(sky)

gui.add(sky.material.uniforms['turbidity'], 'value').min(0).max(20).step(0.1).name('skyTurbidity')
gui.add(sky.material.uniforms['rayleigh'], 'value').min(0).max(10).step(0.1).name('skyRayleigh')
gui.add(sky.material.uniforms['mieCoefficient'], 'value').min(0).max(0.2).step(0.001).name('skyMieCoefficient')
gui.add(sky.material.uniforms['mieDirectionalG'], 'value').min(0).max(1).step(0.001).name('skyMieDirectionalG')
gui.add(sky.material.uniforms['sunPosition'].value, 'x').min(-1).max(1).step(0.001).name('skySunX')
gui.add(sky.material.uniforms['sunPosition'].value, 'y').min(-1).max(1).step(0.001).name('skySunY')
gui.add(sky.material.uniforms['sunPosition'].value, 'z').min(-1).max(1).step(0.001).name('skySunZ')

//const fog = new THREE.Fog('#ff0000', 1, 15)
const fog = new THREE.FogExp2('#03343f',0.08)
scene.fog = fog
/**
 * Animate
 */
const timer = new Timer()
const tick = () =>
{
    timer.update()
    const elapsedTime = timer.getElapsed()

    fireflies.children.forEach((firefly) =>
    {
        const d = firefly.userData

        // Horizontal wandering
        d.angle += d.speed * 0.01
        firefly.position.x += Math.cos(d.angle) * 0.01
        firefly.position.z += Math.sin(d.angle) * 0.01

        // Vertical bobbing
        firefly.position.y =
            1.5 +
            Math.sin(elapsedTime * 2 + d.heightOffset) * 0.4

        // Flicker
        firefly.intensity =
            1.2 +
            Math.sin(elapsedTime * 8 + d.heightOffset) * 0.4 +
            Math.random() * 0.1
    })

    controls.update()
    renderer.render(scene, camera)
    window.requestAnimationFrame(tick)
}

tick()



gui.add(floor.material, 'displacementScale').min(0).max(1).step(0.001).name('floorDisplacementScale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.001).name('floorDisplacementBias')