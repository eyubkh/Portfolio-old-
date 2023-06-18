import ModelLoader from '../utils/modelLoader'
import model from '../assets/env.gltf'

class Environment extends ModelLoader {
  constructor(scene: THREE.Scene) {
    super(model)
    this.renderModel(scene)
  }
}

export default Environment
