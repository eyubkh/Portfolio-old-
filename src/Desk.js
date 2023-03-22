import * as THREE from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import Monitor from './components/Monitor'
import Environment from './components/Environment'
import Lighting from './components/Lighting'
import orbitalContrals from './utils/orbit'

class Desk {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer({
    antialias: true
  })

  webglElement = window.document.getElementById('webgl')

  cssScene = new THREE.Scene()
  cssRenderer = new CSS3DRenderer()
  cssElement = window.document.querySelector('#css')

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000)

  constructor () {
    this.monitor = new Monitor(this.scene, this.cssScene, this.camera)
    this.environment = new Environment(this.scene)
    this.lighting = new Lighting(this.scene)

    this.controls = orbitalContrals(this.camera, this.cssRenderer.domElement)

    this.init()
  }

  init () {
    this.webglElement.appendChild(this.renderer.domElement)
    this.cssElement.appendChild(this.cssRenderer.domElement)

    this.renderer.setClearColor(0xf1f1f1, 1)
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.camera.position.set(0, 150, 150)
    this.camera.lookAt(0, 0, 0)

    this.controls.update()
    this.render()
  }

  start () {
    this.camera.position.set(0, 300, 110)
  }

  resizeRenderer () {
    const canvas = this.renderer.domElement
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const needResize = canvas.width !== width || canvas.height !== height
    if (needResize) {
      this.renderer.setSize(width, height, false)
      this.cssRenderer.setSize(width, height, false)

      const canvas = this.renderer.domElement
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight
      this.camera.updateProjectionMatrix()
    }
    return needResize
  }

  render () {
    this.resizeRenderer()

    this.renderer.render(this.scene, this.camera)
    this.cssRenderer.render(this.cssScene, this.camera)

    this.monitor.render()

    this.controls.update()

    window.requestAnimationFrame(this.render.bind(this))
  }
}

export default Desk
