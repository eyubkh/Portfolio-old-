import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { loadingManager } from './loadingManager'

class ModelLoader {
  constructor (model) {
    this.model = model
    this.loader = new GLTFLoader(loadingManager)
    this.scale = 10
    this.position = new THREE.Vector3(0, 0, 0)
    this.rotation = new THREE.Euler(0, -Math.PI / 2, 0)
  }

  addTo (scene) {
    this.loader.load(this.model, (gltf) => {
      const object = gltf.scene
      object.rotation.copy(this.rotation)
      object.position.copy(this.position)
      object.scale.set(this.scale, this.scale, this.scale)
      scene.add(object)
    })
  }

  setPosition (position) {
    this.position = position
  }

  setRotation (rotation) {
    this.rotation = rotation
  }

  setScale (scale) {
    this.scale = scale
  }
}

export default ModelLoader
