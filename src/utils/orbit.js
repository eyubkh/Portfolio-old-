import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function orbitControl (camera, domElement) {
  const controls = new OrbitControls(camera, domElement)
  controls.maxDistance = 150
  controls.minDistance = 50
  controls.maxPolarAngle = Math.PI / 2.5
  controls.autoRotate = true
  controls.minAzimuthAngle = Math.Pi / 2
  controls.autoRotateSpeed = 0.3

  return controls
}

export default orbitControl
