import './styles/webgl.css'
import * as THREE from 'three'
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import Monitor from './components/Monitor'
import Environment from './components/Environment'
import Lighting from './components/Lighting'
import orbitalContrals from './utils/orbitalControls'
import { screenZoom } from './utils/screenZoom'
import resizeRenderer from './utils/resizeRenderer'
import audio from '@assets/audio/start.mp3'
import { PostProcessing } from './components/PostProcessing'

export const state = {
  isOrbitalContorl: false,
}

class World {
  scene = new THREE.Scene()
  renderer = new THREE.WebGLRenderer({
    antialias: true,
  })

  webglElement = window.document.getElementById('webgl')

  cssScene = new THREE.Scene()
  cssRenderer = new CSS3DRenderer()
  cssElement = window.document.querySelector('#css')
  postProcessing: PostProcessing

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    30000
  )
  controls: any
  monitor: Monitor

  startAudio = new Audio(audio)

  constructor() {
    this.monitor = new Monitor(this.scene, this.cssScene)
    new Environment(this.scene)
    new Lighting(this.scene)
    this.postProcessing = new PostProcessing(this.renderer, this.scene, this.camera)

    this.controls = orbitalContrals(this.camera)
  }

  async init() {
    if (this.webglElement && this.cssElement) {
      this.webglElement.appendChild(this.renderer.domElement)
      this.cssElement.appendChild(this.cssRenderer.domElement)
    }

    this.renderer.setClearColor(0xf1f1f1, 1)
    this.renderer.outputEncoding = THREE.sRGBEncoding

    this.camera.lookAt(0, 0, 0)
    this.camera.position.set(0, 100, 200)

    this.startAudio.volume = 0.3
    this.startAudio.play()

    this.render()
  }

  render() {
    resizeRenderer(this.camera, this.renderer, this.cssRenderer)

    // this.postProcessing.composer.render()
    this.renderer.render(this.scene, this.camera)
    this.cssRenderer.render(this.cssScene, this.camera)

    this.controls.enabled = state.isOrbitalContorl
    if (state.isOrbitalContorl) {
      this.controls.target.set(
        this.monitor.position.x - 0.5,
        this.monitor.position.y + 0.2,
        this.monitor.position.z + 6.5
      )
      this.controls.update()
    } else {
      screenZoom.update(this.camera)
    }

    window.requestAnimationFrame(this.render.bind(this))
  }
}

export default World
