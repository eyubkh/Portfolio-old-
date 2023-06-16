import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default function resizeRenderer (camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, cssRenderer: CSS3DRenderer ) {
  const canvas = renderer.domElement
  const width = canvas.clientWidth
  const height = canvas.clientHeight
  const needResize = canvas.width !== width || canvas.height !== height
  if (needResize) {
    renderer.setSize(width, height, false)
    cssRenderer.setSize(width, height)

    const canvas = renderer.domElement
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
  }
  return needResize
}