import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class ModelLoader {
  constructor (model) {
    this.model = model
    this.loader = new GLTFLoader()
    this.scale = 700
    this.position = new THREE.Vector3(0, 0, 0)
    this.rotation = new THREE.Euler(0, -Math.PI / 2, 0)
  }

  render (scene) {
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

  setScale (scale) {
    this.scale = scale
  }
}

export default ModelLoader
