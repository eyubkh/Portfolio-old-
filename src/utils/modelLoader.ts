import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { loadingManager } from './loadingManager'

class ModelLoader {
  scale = 10
  position = new THREE.Vector3(0, 0, 0)
  rotation = new THREE.Euler(0, -Math.PI / 2, 0)

  model: any
  loader: GLTFLoader

  constructor () {
    this.loader = new GLTFLoader(loadingManager)
  }

  addToScene (scene: THREE.Scene) {
    this.loader.load(this.model, (gltf) => {
      const object = gltf.scene
      object.rotation.copy(this.rotation)
      object.position.copy(this.position)
      object.scale.set(this.scale, this.scale, this.scale)
      scene.add(object)
    })
  }

  setModel(model: any) {
    this.model = model
  }

  setPosition (position: THREE.Vector3) {
    this.position = position
  }

  setRotation (rotation: THREE.Euler) {
    this.rotation = rotation
  }

  setScale (scale: number) {
    this.scale = scale
  }

  createModel(model: any, scene: THREE.Scene) {
    this.setModel(model)
    this.addToScene(scene)
    this.setPosition(this.position)
    this.setRotation(this.rotation)

    this.addToScene(scene)
  }
}

export default ModelLoader
