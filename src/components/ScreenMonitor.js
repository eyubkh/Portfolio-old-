import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default class ScreenMonitor {
  sSize = { w: 1280, h: 1052.44 }
  iframePadding = 32
  iframeSize = {
    w: this.sSize.w - this.iframePadding,
    h: this.sSize.h - this.iframePadding
  }

  constructor (scene, camera, monitorPosition) {
    this.cssScene = new THREE.Scene()
    this.scene = scene
    this.camera = camera
    this.cssRenderer = new CSS3DRenderer()
    this.position = new THREE.Vector3(-50, 0, 470).add(monitorPosition)
    this.scale = new THREE.Vector3(1, 1, 1)
    this.rotation = new THREE.Euler(-0.05, 0, 0)
    this.screenSize = new THREE.Vector2(this.sSize.w, this.sSize.h)

    this.init()
  }

  init () {
    this.cssRenderer.setSize(window.innerWidth, window.innerHeight)
    document.querySelector('#css').appendChild(this.cssRenderer.domElement)

    // const controls = new OrbitControls(this.camera, this.cssRenderer.domElement)
    // controls.update()

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
    const wrapper = document.createElement('iframe')
    wrapper.src = 'https://henryheffernan-os.vercel.app'
    wrapper.style.backgroundColor = 'white'
    wrapper.style.padding = this.iframePadding + 'px'
    wrapper.style.width = this.iframeSize.w + 'px'
    wrapper.style.height = this.iframeSize.h + 'px'

    const object = new CSS3DObject(wrapper)
    return object
  }

  render () {
    this.cssRenderer.render(this.cssScene, this.camera)
  }
}
