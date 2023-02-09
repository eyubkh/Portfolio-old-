import * as THREE from 'three'

class Marker {
  materialColor = { color: 'white' }
  constructor (position, modelPosition, camera) {
    this.modelPosition = modelPosition
    this.position = position

    this.geometry = new THREE.SphereGeometry(50, 32, 16)
    this.material = new THREE.MeshStandardMaterial(this.materialColor)
    this.markerMesh = new THREE.Mesh(this.geometry, this.material)
    this.expandMesh = new THREE.Mesh(this.geometry, new THREE.MeshStandardMaterial(this.materialColor))

    this.raycaster = new THREE.Raycaster()
    this.pointer = new THREE.Vector2()
    this.intersects = {
      object: undefined,
      clicked: undefined
    }

    this.clock = new THREE.Clock()
    this.delta = 0
    this.size = 1
    this.opacity = 1

    this.body = window.document.getElementsByTagName('body')[0]

    this.init()
  }

  init () {
    window.addEventListener('click', event => this.onClick(event))
    window.addEventListener('mousemove', event => this.onHover(event))
    setInterval(() => {
      this.expandMesh.scale.set(1, 1, 1)
      this.expandMesh.material.opacity = 1
      this.size = 1
      this.opacity = 1
    }, 5000)
  }

  onClick (event) {
    this.intersects.clicked = this.raycaster.intersectObjects([this.markerMesh])[0]

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  onHover (event) {
    this.intersects.object = this.raycaster.intersectObjects([this.markerMesh])[0]

    this.pointer.x = (event.clientX / window.innerWidth) * 2 - 1
    this.pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  }

  animate (camera) {
    this.raycaster.setFromCamera(this.pointer, camera)
    camera.lookAt(this.modelPosition)

    this.delta = this.clock.getDelta()

    this.size += this.delta * 4
    this.opacity -= this.delta * 1.2
    this.expandMesh.scale.set(this.size, this.size, this.size)
    this.expandMesh.material.opacity = this.opacity

    if (this.intersects?.object) {
      this.body.style.cursor = 'pointer'
    } else {
      this.body.style.cursor = 'default'
    }

    if (this.intersects?.clicked) {
      camera.position.lerp(new THREE.Vector3(0, 1240, 850), 0.05)
    } else {
      camera.position.lerp(new THREE.Vector3(0, 5040, 5000), 0.05)
    }
  }

  render (scene) {
    this.markerMesh.position.copy(this.position)
    this.expandMesh.position.copy(this.position)
    this.expandMesh.material.transparent = true
    scene.add(this.markerMesh, this.expandMesh)
  }
}

export default Marker
