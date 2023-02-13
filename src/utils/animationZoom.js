import * as THREE from 'three'

class AnimationZoom {
  raycaster = new THREE.Raycaster()
  pointer = new THREE.Vector2()
  intersects = false

  constructor (mesh, object, position) {
    this.mesh = mesh
    this.object = object
    this.position = position

    window.addEventListener('mousemove', event => this.onHover(event))
  }

  onHover (event) {
    this.intersects = !!this.raycaster.intersectObject(this.mesh)[0]

    if (this.intersects) {
      this.object.element.style.pointerEvents = 'initial'
    } else {
      this.object.element.style.pointerEvents = 'none'
    }

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  animate (camera) {
    camera.lookAt(this.position)
    this.raycaster.setFromCamera(this.pointer, camera)

    if (this.intersects) {
      camera.position.lerp(new THREE.Vector3(0, 1240, 950), 0.05)
    } else {
      camera.position.lerp(new THREE.Vector3(0, 5040, 5000), 0.045)
    }
  }
}

export default AnimationZoom
