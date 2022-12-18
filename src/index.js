import './index.css'

import * as THREE from 'three'
import Monitor from './components/Monitor'
import Environment from './components/Environment'

const webglElement = window.document.getElementById('webgl')

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0x0c0c0c, 1)

webglElement.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000)
camera.position.set(0, 5040, 5000)
camera.lookAt(0, 0, 0)

const color = 'white'
const intensity = 1.5

const light = new THREE.DirectionalLight(color, intensity)
const helper = new THREE.DirectionalLightHelper(light, 100, 'blue')
light.position.set(0, 200, 200)
scene.add(helper)
scene.add(light)

const ambientLight = new THREE.AmbientLight(color, 1.2)
scene.add(ambientLight)

const environment = new Environment(scene)
environment.init()

const monitor = new Monitor(scene, camera)
monitor.init()

function render () {
  window.requestAnimationFrame(render)

  monitor.render()
  renderer.render(scene, camera)
}
render()
