import './index.css'
import resize from './utils/resize'
import monitorModel from './public/monitor.glb'
import booksModel from './public/scene.gltf'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const canvas = window.document.getElementById('canvas')
const renderer = new THREE.WebGLRenderer({ canvas })

renderer.setClearColor(0x333333, 1)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 3, 4)
camera.lookAt(0, 1, 0)

const color = 0xFFFFFF
const intensity = 0.6
const ambientLight = new THREE.AmbientLight(color, intensity)
scene.add(ambientLight)

const light = new THREE.DirectionalLight(color, intensity)
light.position.set(0, 1, 5)
scene.add(light)

const plane = new THREE.PlaneGeometry(6, 6, 6)
const planeMaterial = new THREE.MeshBasicMaterial({ color: '#f1f1f1' })
const planeMesh = new THREE.Mesh(plane, planeMaterial)
planeMesh.rotation.x = -Math.PI / 2
scene.add(planeMesh)

const obj = new GLTFLoader()
obj.load(monitorModel, (gltf) => {
  const object = gltf.scene
  object.scale.set(0.01, 0.01, 0.01)
  object.position.y = 1.3
  object.rotateY(Math.PI / -2)
  // scene.add(object)
})

const books = new GLTFLoader()
books.load(booksModel, (gltf) => {
  const object = gltf.scene
  console.log(object)
  object.position.set(0,0,0)
  scene.add(object)
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
