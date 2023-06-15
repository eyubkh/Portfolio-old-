import ModelLoader from '../utils/modelLoader'
import model from '../assets/env.gltf'

class Environment extends ModelLoader {
  constructor (scene) {
    super()
    this.createModel(model, scene)
  }
}

export default Environment
