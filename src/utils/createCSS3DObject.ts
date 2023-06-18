import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'

export default function createCSS3DObject(
  padding: number,
  size: { w: number; h: number }
) {
  const wrapper = document.createElement('iframe')
  wrapper.src = 'https://portfolio-environment.vercel.app'
  wrapper.style.backgroundColor = 'black'
  wrapper.style.padding = padding + 'px'
  wrapper.style.width = size.w + 'px'
  wrapper.style.height = size.h + 'px'

  return new CSS3DObject(wrapper)
}
