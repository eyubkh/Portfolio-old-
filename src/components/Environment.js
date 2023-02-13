import ModelLoader from '../utils/modelLoader'
import model from '../public/env.gltf'

class Environment {
  constructor (scene) {
    this.scene = scene

    this.init()
  }

  init () {
    const environmentModel = new ModelLoader(model)
    environmentModel.render(this.scene)
  }
}

export default Environment
