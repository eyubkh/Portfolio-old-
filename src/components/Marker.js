import * as THREE from 'three'

class Marker {
  constructor (position, modelPosition) {
    this.position = position
    this.geometry = new THREE.SphereGeometry(50, 32, 16)
    this.material = new THREE.MeshStandardMaterial({ color: 'blue' })
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.spandMesh = new THREE.Mesh(this.geometry, new THREE.MeshStandardMaterial({ color: 'blue' }))

    this.modelPosition = modelPosition

    this.clicked = false
    this.pointer = new THREE.Vector2()
    this.raycaster = new THREE.Raycaster()
    this.intersects = []

    this.clock = new THREE.Clock()
    this.delta = 0
    this.size = 1
    this.opacity = 1

    this.init()
  }

  init () {
    window.addEventListener('click', (event) => this.onClick(event))
    setInterval(() => {
      this.spandMesh.scale.set(1, 1, 1)
      this.spandMesh.material.opacity = 1
      this.size = 1
      this.opacity = 1
    }, 6000)
  }

  onClick (event) {
    this.intersects = this.raycaster.intersectObjects([this.mesh])

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  animate (camera) {
    this.raycaster.setFromCamera(this.pointer, camera)
    camera.lookAt(this.modelPosition)

    this.delta = this.clock.getDelta()

    this.size += this.delta * 4
    this.opacity -= this.delta * 1.5
    this.spandMesh.scale.set(this.size, this.size, this.size)
    this.spandMesh.material.opacity = this.opacity

    if (this.intersects[0]?.object.uuid === this.mesh.uuid) {
      camera.position.lerp(new THREE.Vector3(0, 1240, 1100), 0.05)
    } else {
      camera.position.lerp(new THREE.Vector3(0, 5040, 5000), 0.05)
    }
  }

  render (scene) {
    this.mesh.position.copy(this.position)
    this.spandMesh.position.copy(this.position)
    this.spandMesh.material.transparent = true
    scene.add(this.mesh, this.spandMesh)
  }
}

export default Marker
