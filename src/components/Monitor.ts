import * as THREE from 'three'
import model from '../assets/monitor.gltf'
import ModelLoader from '../utils/modelLoader'
import ScreenMonitor from './ScreenMonitor'

class Monitor extends ModelLoader {
  monitorPosition = new THREE.Vector3(0, 18, -5)
  monitorRotation = new THREE.Euler(0, -Math.PI / 2 + 0.025, 0)

  screenMonitor: ScreenMonitor

  constructor(scene: THREE.Scene, cssScene: THREE.Scene) {
    super(model)

    this.screenMonitor = new ScreenMonitor(
      scene,
      cssScene,
      this.monitorPosition
    )

    this.setPosition(this.monitorPosition)
    this.setRotation(this.monitorRotation)
    this.renderModel(scene)
  }
}

export default Monitor
