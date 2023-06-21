import * as THREE from 'three'

class ScreenZoom {
  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2()
  intersects = false
  mesh = new THREE.Mesh()
  screenElement = document.getElementsByTagName('iframe')
  uiElement = document.querySelector('#ui')
  cssElement = document.querySelector('#css')
  position = new THREE.Vector3(0, 0, 0)

  init(mesh: THREE.Mesh) {
    this.mesh = mesh

    if (this.uiElement && this.cssElement) {
      this.uiElement.addEventListener('mousemove', (event) =>
        this.onHover(event)
      )
      this.cssElement.addEventListener('mousemove', (event) =>
        this.onHover(event)
      )
    } else {
      console.error('this.mesh is undefined')
    }
  }

  onHover(event: any) {
    this.intersects = !!this.raycaster.intersectObject(this.mesh)[0]

    if (this.intersects && this.screenElement[0] && this.uiElement) {
      this.uiElement.setAttribute(
        'style',
        'animation:  hide .6s ease-out forwards;'
      )
      this.screenElement[0].style.pointerEvents = 'initial'
    } else if (this.screenElement[0] && this.uiElement) {
      this.uiElement?.setAttribute(
        'style',
        'animation:  show .6s ease-in forwards;'
      )
      this.screenElement[0].style.pointerEvents = 'none'
    }

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  update(camera: THREE.PerspectiveCamera) {
    camera.lookAt(this.mesh.position)
    this.raycaster.setFromCamera(this.pointer, camera)
    if (this.intersects) {
      // on focus screen position
      camera.position.lerp(new THREE.Vector3(0, 19, 14), 0.08)
    } else {
      // default position
      camera.position.lerp(new THREE.Vector3(0, 60, 80), 0.04)
    }
  }
}

export const screenZoom = new ScreenZoom()
