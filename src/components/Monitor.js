import * as THREE from 'three'
import model from '../public/monitor.gltf'
import ModelLoader from '../utils/modelLoader'
import ScreenMonitor from './ScreenMonitor'
import data from '../utils/data'

class Monitor {
  constructor (scene, cssScene, camera) {
    this.scene = scene
    this.camera = camera
    this.cssScene = cssScene
    this.position = new THREE.Vector3(data.monitor.x, data.monitor.y, data.monitor.z)
    this.screenMonitor = new ScreenMonitor(this.scene, this.cssScene, this.camera, this.position)

    this.init()
  }

  init () {
    const monitorModel = new ModelLoader(model, this.position)
    monitorModel.setPosition(this.position)
    monitorModel.render(this.scene)
  }
}

export default Monitor
