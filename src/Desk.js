import * as THREE from 'three'
import Monitor from './components/Monitor'
import Environment from './components/Environment'
import Lighting from './components/Lighting'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

class Desk {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer()
  cssScene = new THREE.Scene()
  cssRenderer = new CSS3DRenderer()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000)
  webglElement = window.document.getElementById('webgl')
  cssElement = window.document.querySelector('#css')

  constructor () {
    this.monitor = new Monitor(this.scene, this.camera, this.cssScene)
    this.environment = new Environment(this.scene)
    this.lighting = new Lighting(this.scene)

    this.init()
  }

  init () {
    this.webglElement.appendChild(this.renderer.domElement)
    this.cssElement.appendChild(this.cssRenderer.domElement)

    this.renderer.setClearColor(0xf1f1f1, 1)
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.camera.position.set(0, 5040, 5000)
    this.camera.lookAt(0, 0, 0)

    this.render()
  }

  resizeRenderer () {
    const canvas = this.renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      this.renderer.setSize(width, height, false)
      this.cssRenderer.setSize(width, height, false)
    }
    return needResize
  }

  render () {
    if (this.resizeRenderer()) {
      const canvas = this.renderer.domElement
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }

    this.renderer.render(this.scene, this.camera)
    this.cssRenderer.render(this.cssScene, this.camera)

    this.monitor.render()

    window.requestAnimationFrame(this.render.bind(this))
  }
}

export default Desk
