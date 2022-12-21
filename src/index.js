import './index.css'

import * as THREE from 'three'
import Monitor from './components/Monitor'
import Environment from './components/Environment'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'

const webglElement = window.document.getElementById('webgl')

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xf1f1f1, 1)

webglElement.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000)
camera.position.set(0, 5040, 5000)
camera.lookAt(0, 0, 0)

const light = new THREE.HemisphereLight(0xffffff, 0x080820, 1)
const helper = new THREE.HemisphereLightHelper(light, 500)
light.position.set(0, 4000, 4000)
scene.add(helper, light)

const pointLight = new THREE.PointLight('white', 0.5)
const pointLightHelper = new THREE.PointLightHelper(pointLight, 300, 'blue')
pointLight.position.set(0, 2000, 2000)
scene.add(pointLight, pointLightHelper)
/// ////

const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

// const bokeh = new BokehPass(scene, camera, {
//   focus: 500,
//   aperture: 0,
//   maxBlur: 0,

//   width: window.innerWidth,
//   height: window.innerHeight
// })

// composer.addPass(bokeh)

/// ///

// const ambientLight = new THREE.AmbientLight('white', 1)
// scene.add(ambientLight)

// const environment = new Environment(scene)
// environment.init()

const monitor = new Monitor(scene, camera)
monitor.init()

function render () {
  window.requestAnimationFrame(render)

  monitor.render()
  composer.render()
}
render()
