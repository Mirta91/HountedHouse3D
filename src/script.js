import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
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

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial()
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
    new THREE.MeshStandardMaterial()
)
walls.position.y = 1.25
house.add(walls)

// Roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.2, 1.7, 4),
  new THREE.MeshStandardMaterial({ color: 0x8b0000, flatShading: true })
);

roof.position.y = 2.5 + 0.75;
roof.rotation.y = Math.PI / 4;
house.add(roof);

// Door

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2.5),
    new THREE.MeshStandardMaterial({ color: 0x654321 })
)
door.position.y = 1.25
door.position.z = 2 + 0.01
house.add(door)

// Bushes

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 })

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)

bush1.position.x = 1.2
bush1.position.z = 2.5
bush1.position.y = 0.2

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.3, 0.3, 0.3)

bush2.position.x = 1.8
bush2.position.z = 2.5
bush2.position.y = 0.2

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)

bush3.position.x = - 1.8
bush3.position.z = 2.8
bush3.position.y = 0.2

house.add(bush1, bush2, bush3)

// Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial()

const graves = new THREE.Group()
scene.add(graves)

for (let i = 0; i < 20; i++) {
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)

    let x, z

    do {
        x = (Math.random() - 0.5) * 18
        z = (Math.random() - 0.5) * 18
    } while (Math.sqrt(x * x + z * z) < 4) // 4 = center radius to avoid

    grave.position.set(
        x,
        Math.random() * 0.4,
        z
    )

    graves.add(grave)
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 1.5)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

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

/**
 * Animate
 */
const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()