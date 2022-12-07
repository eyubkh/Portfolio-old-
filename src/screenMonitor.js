import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

const SCREEN_SIZE = { w: 1280, h: 1024 }
const IFRAME_PADDING = 32
const IFRAME_SIZE = {
  w: SCREEN_SIZE.w - IFRAME_PADDING,
  h: SCREEN_SIZE.h - IFRAME_PADDING
}

export default class ScreenMonitor {
  constructor (scene, camera) {
    this.cssScene = new THREE.Scene()
    this.scene = scene
    this.camera = camera
    this.cssRenderer = new CSS3DRenderer()
    this.position = new THREE.Vector3(0, 1, 11)
    this.scale = new THREE.Vector3(0.1, 0.1, 0.1)
    this.rotation = new THREE.Euler(-0.06, 0, 0)
    this.screenSize = new THREE.Vector2(SCREEN_SIZE.w, SCREEN_SIZE.h)

    this.init()
  }

  init () {
    this.cssRenderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector('#css').appendChild(this.cssRenderer.domElement)

    const controls = new OrbitControls(this.camera, this.cssRenderer.domElement)
    controls.update()

    const object = this.createCSS3DObject()
    object.position.copy(this.position)
    object.scale.copy(this.scale)
    object.rotation.copy(this.rotation)

    const material = new THREE.MeshPhongMaterial({
      opacity: 0.2,
      color: new THREE.Color('black'),
      blending: THREE.NoBlending,
      side: THREE.DoubleSide
    })
    const geometry = new THREE.PlaneGeometry(this.screenSize.width, this.screenSize.height)
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.copy(this.position)
    mesh.scale.copy(this.scale)
    mesh.castShadow = false
    mesh.receiveShadow = true
    mesh.rotation.copy(this.rotation)

    this.scene.add(mesh)
    this.cssScene.add(object)
  }

  createCSS3DObject () {
    const wrapper = document.createElement('div')
    wrapper.style.width = this.screenSize.width + 'px'
    wrapper.style.height = this.screenSize.height + 'px'
    wrapper.style.backgroundColor = 'blue'

    const object = new CSS3DObject(wrapper)
    return object
  }

  render () {
    this.cssRenderer.render(this.cssScene, this.camera)
  }
}
