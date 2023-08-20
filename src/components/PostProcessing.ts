import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass'
// import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { Scene, WebGLRenderer, PerspectiveCamera } from 'three'

export class PostProcessing {
  public composer: EffectComposer
  renderPass: RenderPass
  constructor(renderer: WebGLRenderer, scene: Scene, camera: PerspectiveCamera) {
    this.composer = new EffectComposer(renderer)
    this.renderPass = new RenderPass(scene, camera)

    this.init()
  }

  init() {
    this.composer.addPass(this.renderPass)
    // const effectFXAA = new ShaderPass(ShaderExtras)

    const filmPass = new FilmPass(0, 0, 0, 0)
    this.composer.addPass(filmPass)
  }
}