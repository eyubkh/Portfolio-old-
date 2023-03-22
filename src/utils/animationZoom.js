import * as THREE from 'three'

class AnimationZoom {
  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2()
  intersects = false

  constructor (mesh) {
    this.mesh = mesh
    this.screenElement = document.getElementsByTagName('iframe')
    this.position = new THREE.Vector3(0, 0, 0)

    window.addEventListener('mousemove', event => this.onHover(event))
  }

  onHover (event) {
    this.intersects = !!this.raycaster.intersectObject(this.mesh)[0]

    if (this.intersects) {
      this.screenElement[0].style.pointerEvents = 'initial'
    } else {
      this.screenElement[0].style.pointerEvents = 'none'
    }

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  animate (camera) {
    camera.lookAt(this.mesh.position)
    this.raycaster.setFromCamera(this.pointer, camera)

    if (this.intersects) {
      camera.position.lerp(new THREE.Vector3(0, 19, 17), 0.05)
    } else {
      camera.position.lerp(new THREE.Vector3(0, 60, 80), 0.025)
    }
  }
}

export default AnimationZoom
