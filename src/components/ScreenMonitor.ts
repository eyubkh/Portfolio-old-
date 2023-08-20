import * as THREE from 'three'
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { screenZoom } from '../utils/screenZoom'
import createCSS3DObject from '../utils/createCSS3DObject'

class ScreenMonitor {
  readonly screenSize = { w: 1280, h: 1052 }
  readonly iframeScale = 0.015
  readonly iframePadding = 32
  readonly iframeSize = {
    w: this.screenSize.w - this.iframePadding,
    h: this.screenSize.h - this.iframePadding,
  }

  scene: THREE.Scene
  cssScene: THREE.Scene
  position: THREE.Vector3
  CSS3DObject: CSS3DObject
  mesh: THREE.Mesh

  scale = new THREE.Vector3(
    this.iframeScale,
    this.iframeScale,
    this.iframeScale
  )
  rotation = new THREE.Euler(-0.05, 0.025, 0)
  geometry = new THREE.PlaneGeometry(this.screenSize.w, this.screenSize.h)
  material = new THREE.MeshPhongMaterial({
    opacity: 0.2,
    color: new THREE.Color('black'),
    blending: THREE.NoBlending,
    side: THREE.DoubleSide,
  })

  constructor(
    scene: THREE.Scene,
    cssScene: THREE.Scene,
    monitorPosition: THREE.Vector3
  ) {
    this.scene = scene
    this.cssScene = cssScene

    this.position = new THREE.Vector3(-0.5, 0.2, 6.5).add(monitorPosition)

    this.CSS3DObject = createCSS3DObject(this.iframePadding, this.iframeSize)
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.init()
  }

  init() {
    this.CSS3DObject.position.copy(this.position)
    this.CSS3DObject.scale.copy(this.scale)
    this.CSS3DObject.rotation.copy(this.rotation)
    this.CSS3DObject.element.style.pointerEvents = 'none'

    this.mesh.position.copy(this.position)
    this.mesh.scale.copy(this.scale)
    this.mesh.rotation.copy(this.rotation)

    screenZoom.init(this.mesh)

    this.cssScene.add(this.CSS3DObject)
    this.scene.add(this.mesh)
  }
}

export default ScreenMonitor
