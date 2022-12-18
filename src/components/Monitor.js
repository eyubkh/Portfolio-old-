import * as THREE from 'three'
import model from '../public/monitor.gltf'
import ModelLoader from '../utils/modelLoader'
import Marker from './Marker'
import ScreenMonitor from './ScreenMonitor'

class Monitor {
  constructor (scene, camera) {
    this.scene = scene
    this.camera = camera
    this.position = new THREE.Vector3(0, 1240, -350)
    this.screenMonitor = new ScreenMonitor(this.scene, this.camera, this.position)
    this.markerPosition = new THREE.Vector3(1000, -800, 700).add(this.position)
    this.marker = new Marker(this.markerPosition, this.position)
  }

  init () {
    const monitorModel = new ModelLoader(model, this.position)
    monitorModel.setPosition(this.position)
    monitorModel.render(this.scene)

    this.marker.render(this.scene)
  }

  render () {
    this.marker.animate(this.camera)
    this.screenMonitor.render()
  }
}

export default Monitor
