import * as THREE from 'three'

class Lighting {
  lightIntesity = 0.25
  ambientIntesity = 0.43
  lightColor = 0xffffff
  ambientColor = 0xffffff

  constructor (scene) {
    this.scene = scene

    this.topLight = new THREE.DirectionalLight(this.lightColor, this.lightIntesity * 0.6)
    this.frontLight = new THREE.DirectionalLight(this.lightColor, this.lightIntesity)
    this.ambientLight = new THREE.AmbientLight(this.ambientColor, this.ambientIntesity)
  }

  init () {
    this.topLight.position.set(0, 4000, 0)
    this.scene.add(this.topLight)

    this.frontLight.position.set(0, 4000, 2000)
    this.frontLight.rotateX(1)
    this.scene.add(this.frontLight)

    this.scene.add(this.ambientLight)
  }
}

export default Lighting
