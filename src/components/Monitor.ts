import * as THREE from 'three'
import model from '../assets/monitor.gltf'
import ModelLoader from '../utils/modelLoader'
import ScreenMonitor from './ScreenMonitor'
import data from '../utils/data'

class Monitor extends ModelLoader {
  monitorPosition = new THREE.Vector3(data.monitor.x, data.monitor.y, data.monitor.z)
  monitorRotation = new THREE.Euler(0, -Math.PI / 2 + 0.025, 0)

  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  cssScene: THREE.Scene
  screenMonitor: ScreenMonitor

  constructor (scene: THREE.Scene, cssScene: THREE.Scene, camera: THREE.PerspectiveCamera) {
    super()

    this.scene = scene
    this.camera = camera
    this.cssScene = cssScene
    this.screenMonitor = new ScreenMonitor(this.scene, this.cssScene, this.camera, this.monitorPosition)
    
    this.setPosition(this.monitorPosition)
    this.setRotation(this.monitorRotation)
    this.createModel(model, scene)
  }

}

export default Monitor
