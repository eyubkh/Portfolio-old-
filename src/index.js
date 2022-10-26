import './index.css'
import resize from './utils/resize'
import model from './public/object.obj'

import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = window.document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({ canvas })

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 2)
camera.lookAt(0, 0, 0)

const color = 0xFFFFFF
const intensity = 0.5
const ambientLight = new THREE.AmbientLight(color, intensity)
scene.add(ambientLight)

const light = new THREE.DirectionalLight(color, intensity)
light.position.set(6, 0, 0)
scene.add(light)

const cube = new THREE.BoxGeometry(1, 1, 1)
const cubeMaterial = new THREE.MeshPhongMaterial({ color: 'blue' })
const cubeMesh = new THREE.Mesh(cube, cubeMaterial)
scene.add(cubeMesh)

/// Loader
const obj = new OBJLoader()
obj.load(model, (root) => {
  scene.add(root)
})
const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 0, 0)
controls.update()

function render () {
  window.requestAnimationFrame(render)
  if (resize(renderer)) {
    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }
  controls.update()
  renderer.render(scene, camera)
}

window.requestAnimationFrame(render)
