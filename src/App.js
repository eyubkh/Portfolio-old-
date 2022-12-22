import * as THREE from 'three'
import Monitor from './components/Monitor'
import Environment from './components/Environment'
import Lighting from './components/Lighting'

class App {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000)
  webglElement = window.document.getElementById('webgl')

  constructor () {
    this.monitor = new Monitor(this.scene, this.camera)
    this.environment = new Environment(this.scene)
    this.lighting = new Lighting(this.scene)

    this.init()
  }

  init () {
    this.webglElement.appendChild(this.renderer.domElement)

    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setClearColor(0xf1f1f1, 1)
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.camera.position.set(0, 5040, 5000)
    this.camera.lookAt(0, 0, 0)

    this.monitor.init()
    this.environment.init()
    this.lighting.init()
  }

  render () {
    window.requestAnimationFrame(() => this.render())

    this.renderer.render(this.scene, this.camera)
    this.monitor.render()
  }
}

export default App
