import './index.css'

import * as THREE from 'three'
import Monitor from './components/Monitor'
import Environment from './components/Environment'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader.js'
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass'
import orbitControl from './utils/orbit'

const webglElement = window.document.getElementById('webgl')

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xf1f1f1, 1)

webglElement.appendChild(renderer.domElement)

renderer.outputEncoding = THREE.sRGBEncoding

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 30000)
camera.position.set(0, 5040, 5000)
camera.lookAt(0, 0, 0)

const intesity = 0.25

const light = new THREE.DirectionalLight(0xffffff, intesity)
light.position.set(0, 4000, 2000)
light.rotateX(1)
scene.add(light)

const secondLight = new THREE.DirectionalLight('white', intesity * 0.6)
secondLight.position.set(0, 4000, 0)

scene.add(secondLight)

/// ////

const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

/// ///

const ambientLight = new THREE.AmbientLight('white', 0.43)
scene.add(ambientLight)

const environment = new Environment(scene)
environment.init()

const monitor = new Monitor(scene, camera)
monitor.init()

function render () {
  window.requestAnimationFrame(render)

  monitor.render()
  composer.render()
}
render()
