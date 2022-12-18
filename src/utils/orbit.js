import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

function orbitControl (camera, domElement) {
  const controls = new OrbitControls(camera, domElement)
  // controls.maxDistance = 700
  // controls.minDistance = 100
  // controls.maxPolarAngle = Math.PI / 2.5

  return controls
}

export default orbitControl
