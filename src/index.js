import './index.css'
import monitorModel from './public/monitor.gltf'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import ScreenMonitor from './screenMonitor'

const webglElement = window.document.getElementById('webgl')

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xf1f1f1, 1)

webglElement.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000)
camera.position.set(400, 400, 500)
camera.lookAt(0, 0, 0)

const color = 0xFFFFFF
const intensity = 0.6
const ambientLight = new THREE.AmbientLight(color, intensity)
scene.add(ambientLight)

const light = new THREE.DirectionalLight(color, intensity)
light.position.set(0, 1, 5)
scene.add(light)

const monitor = new GLTFLoader()
monitor.load(monitorModel, (gltf) => {
  const object = gltf.scene
  const scale = 0.85
  object.rotateY(-Math.PI / 2)
  object.scale.set(scale, scale, scale)

  scene.add(object)
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.update()

const screenMonitor = new ScreenMonitor(scene, camera)

function render () {
  window.requestAnimationFrame(render)

  controls.update()

  renderer.render(scene, camera)
  screenMonitor.render()
}

window.requestAnimationFrame(render)
