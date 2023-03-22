import * as THREE from 'three'
import model from '../public/monitor.gltf'
import ModelLoader from '../utils/modelLoader'
import ScreenMonitor from './ScreenMonitor'

class Monitor {
  constructor (scene, camera, cssScene) {
    this.scene = scene
    this.camera = camera
    this.cssScene = cssScene
    this.position = new THREE.Vector3(0, 19, -5)
    this.screenMonitor = new ScreenMonitor(this.scene, this.camera, this.position, this.cssScene)

    this.init()
  }

  init () {
    const monitorModel = new ModelLoader(model, this.position)
    monitorModel.setPosition(this.position)
    monitorModel.render(this.scene)
  }

  render () {
    this.screenMonitor.render()
  }
}

export default Monitor
