import * as THREE from 'three'

class AnimationZoom {
  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2()
  intersects = false
  mesh = undefined
  screenElement = document.getElementsByTagName('iframe')
  position = new THREE.Vector3(0, 0, 0)

  defineMesh (mesh) {
    this.mesh = mesh

    return this
  }

  init () {
    if (this.mesh) {
      document.querySelector('#css').addEventListener('mousemove', event => this.onHover(event))
    } else {
      console.error('this.mesh is undefined')
    }
  }

  onHover (event) {
    this.intersects = !!this.raycaster.intersectObject(this.mesh)[0]

    if (this.intersects && this.screenElement[0]) {
      this.screenElement[0].style.pointerEvents = 'initial'
    } else if (this.screenElement[0]) {
      this.screenElement[0].style.pointerEvents = 'none'
    }

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  update (camera) {
    camera.lookAt(this.mesh.position)
    this.raycaster.setFromCamera(this.pointer, camera)
    if (this.intersects) {
      camera.position.lerp(new THREE.Vector3(0, 19, 14), 0.05)
    } else {
      camera.position.lerp(new THREE.Vector3(0, 60, 80), 0.025)
    }
  }
}

export const animationZoom = new AnimationZoom()
