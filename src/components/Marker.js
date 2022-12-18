import * as THREE from 'three'

class Marker {
  constructor (position, modelPosition) {
    this.position = position
    this.geometry = new THREE.SphereGeometry(100, 32, 16)
    this.material = new THREE.MeshBasicMaterial({ color: 'blue' })
    this.mesh = new THREE.Mesh(this.geometry, this.material)

    this.modelPosition = modelPosition

    this.clicked = false
    this.pointer = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()
    this.intersects = []

    this.init()
  }

  init () {
    window.addEventListener('click', (event) => this.onClick(event))
  }

  onClick (event) {
    this.intersects = this.raycaster.intersectObjects([this.mesh])

    console.log(this.intersects)

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  animate (camera) {
    this.raycaster.setFromCamera(this.pointer, camera)
    camera.lookAt(this.modelPosition)

    if (this.intersects[0]?.object.uuid === this.mesh.uuid) {
      camera.position.lerp(new THREE.Vector3(0, 1240, 1100), 0.05)
    } else {
      camera.position.lerp(new THREE.Vector3(0, 5040, 5000), 0.05)
    }
  }

  render (scene) {
    this.mesh.position.copy(this.position)
    scene.add(this.mesh)
  }
}

export default Marker
