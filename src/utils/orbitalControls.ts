import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function orbitControl(camera: THREE.PerspectiveCamera) {
  const domElement = document.getElementById('ui')
  let controls = null

  if (domElement instanceof HTMLDivElement) {
    controls = new OrbitControls(camera, domElement)

    controls.maxDistance = 150
    controls.minDistance = 20
    controls.maxPolarAngle = Math.PI / 2.5
    controls.autoRotate = true
    controls.enablePan = false
    controls.autoRotateSpeed = 0.3
    controls.minAzimuthAngle = -Math.PI / 3.3
    controls.maxAzimuthAngle = Math.PI / 3.3
  }

  return controls
}

export default orbitControl
