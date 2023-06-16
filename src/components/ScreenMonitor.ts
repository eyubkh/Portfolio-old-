import * as THREE from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { animationZoom } from '../utils/animationZoom'

class ScreenMonitor {
  readonly screenSize = { w: 1280, h: 1052.44 }
  readonly iframeScale = 0.0142
  readonly iframePadding = 32
  readonly iframeSize = {
    w: this.screenSize.w - this.iframePadding,
    h: this.screenSize.h - this.iframePadding
  }

  scene: THREE.Scene
  camera: THREE.Camera
  cssScene: THREE.Scene
  position: THREE.Vector3
  CSS3DObject: CSS3DObject
  mesh: THREE.Mesh
  
  scale = new THREE.Vector3(this.iframeScale, this.iframeScale, this.iframeScale)
  rotation = new THREE.Euler(-0.05, 0.025, 0)
  geometry = new THREE.PlaneGeometry(this.screenSize.w, this.screenSize.h)
  material = new THREE.MeshPhongMaterial({
    opacity: 0.2,
    color: new THREE.Color('black'),
    blending: THREE.NoBlending,
    side: THREE.DoubleSide
  })


  constructor (scene: THREE.Scene, cssScene: THREE.Scene, camera: THREE.PerspectiveCamera, monitorPosition: THREE.Vector3) {
    this.scene = scene
    this.camera = camera
    this.cssScene = cssScene

    this.position = new THREE.Vector3(-0.5, 0.2, 6.5).add(monitorPosition)

    this.CSS3DObject = this.createCSS3DObject()

    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.init()
  }

  init () {
    this.CSS3DObject.position.copy(this.position)
    this.CSS3DObject.scale.copy(this.scale)
    this.CSS3DObject.rotation.copy(this.rotation)
    this.CSS3DObject.element.style.pointerEvents = 'none'

    this.mesh.position.copy(this.position)
    this.mesh.scale.copy(this.scale)
    this.mesh.castShadow = false
    this.mesh.receiveShadow = true
    this.mesh.rotation.copy(this.rotation)

    animationZoom
      .defineMesh(this.mesh)
      .init()

    this.cssScene.add(this.CSS3DObject)
    this.scene.add(this.mesh)
  }

  createCSS3DObject () {
    const wrapper = document.createElement('iframe')
    wrapper.src = 'https://portfolio-environment.vercel.app'
    wrapper.style.backgroundColor = 'black'
    wrapper.style.padding = this.iframePadding + 'px'
    wrapper.style.width = this.iframeSize.w + 'px'
    wrapper.style.height = this.iframeSize.h + 'px'

    return new CSS3DObject(wrapper)
  }
}

export default ScreenMonitor
