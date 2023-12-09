import gsap from 'gsap'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmospherevertexShader from './shaders/atmosphereVertex.glsl'
import atmospherefragmentShader from './shaders/atmosphereFragment.glsl'

console.log(atmospherevertexShader)
console.log(atmospherefragmentShader)

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth/innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer(
  {
    antialias: true, 
    canvas: document.querySelector('canvas')
  }
)

renderer.setSize(innerWidth,innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)


const sphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms:
        {
          globeTexture:{
            value: new THREE.TextureLoader().load('./01-3.jpg')
          }
        }
      })
)

const atmosphere = new THREE.Mesh(new THREE.SphereGeometry(5, 50, 50),
      new THREE.ShaderMaterial({
        vertexShader:atmospherevertexShader,
        fragmentShader:atmospherefragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
      })
)
atmosphere.scale.set(1.1,1.1,1.1)

const group = new THREE.Group()
group.add(sphere)
group.add(atmosphere)
scene.add(group)

const starGeometry = new THREE.BufferGeometry()
const starMaterial = new THREE.PointsMaterial({
  color:0xffffff
})

const starVertices = []
for(let i=0; i<5000;i++){
  const x = (Math.random() - 0.5) * 2000
  const y = (Math.random() - 0.5) * 2000
  const z = -Math.random() * 2000
  starVertices.push(x,y,z)
}
starGeometry.setAttribute('position',new THREE.Float32BufferAttribute(starVertices,3))

const stars = new THREE.Points(
  starGeometry,starMaterial
)
scene.add(stars)

camera.position.z = 15
const mouse = {
  x:0,
  y:0
}

addEventListener('mousemove',(e)=>{
  mouse.x = (e.clientX/innerWidth)*2 - 1
  mouse.y = -(e.clientY/innerHeight)*2 + 1
})

function animate()
{
  requestAnimationFrame(animate)
  renderer.render(scene,camera)
  sphere.rotation.y += 0.002
  gsap.to(group.rotation, {
    x: -mouse.y*0.3,
    y: mouse.x * 0.5,
    duration: 2
  })
}
animate()

