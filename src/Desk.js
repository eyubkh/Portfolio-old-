import './styles/webgl.css'
import * as THREE from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import Monitor from './components/Monitor'
import Environment from './components/Environment'
import Lighting from './components/Lighting'
import orbitalContrals from './utils/orbit'
import { loadingManagerPromise } from './utils/loadingManager'
import { animationZoom } from './utils/animationZoom'
import { globalState } from './utils/globalState'

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

    this.controls = orbitalContrals(this.camera, document.getElementById('ui'))

    this.init()
  }

  async init () {
    this.webglElement.appendChild(this.renderer.domElement)
    this.cssElement.appendChild(this.cssRenderer.domElement)

    this.renderer.setClearColor(0xf1f1f1, 1)
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.camera.lookAt(0, 0, 0)

    await loadingManagerPromise
      .then(() => {
        this.render()
        setTimeout(() => {
          this.camera.position.set(0, 500, 800)
        }, 4000)
      })
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

    this.controls.enabled = globalState.isOrbitalContorl
    if (globalState.isOrbitalContorl) {
      this.controls.update()
    } else {
      animationZoom.update(this.camera)
    }

    window.requestAnimationFrame(this.render.bind(this))
  }
}

export default Desk
