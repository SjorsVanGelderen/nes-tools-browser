import * as ColorSpec from "../color"

import 
  { Map
  , List
  } from "immutable"

import
  { WebGLRenderer
  , OrthographicCamera
  , Scene
  , Mesh
  , Color
  , Light
  , AmbientLight
  , ShaderMaterial
  , Vector2
  , Vector3
  } from "three"

import
  { frustumSize
  , aspectRatio
  } from "../screen"

// import 
//   { makeSurface
//   } from "./mesh"

// import
//   { makeCharacterMesh
//   } from "./character"

import
  { makeFullPaletteMesh
  , makeSamplesMesh
  } from "./mesh"

export type ThreeState =
  { scene:     Scene
  , camera:    OrthographicCamera
  , renderer:  WebGLRenderer
  , meshes:    Map<string, Mesh>
  , shaders:   Map<string, ShaderMaterial>
  }

export const threeStateZero: () => ThreeState = () => {
  const scene:    Scene              = makeScene()
  const camera:   OrthographicCamera = makeCamera()
  const renderer: WebGLRenderer      = makeRenderer()

  const meshes = Map<string, Mesh>(
    [ [ "palette",   makeFullPaletteMesh() ]
    , [ "samples",   makeSamplesMesh()     ]
    // , [ "character", makeCharacterMesh()   ]
    ]
  )
  meshes.valueSeq().forEach(x => x != undefined ? scene.add(x) : {})

  const shaders = Map<string, ShaderMaterial>()

  return (
    { scene:     scene
    , camera:    camera
    , renderer:  renderer
    , meshes:    meshes
    , shaders:   shaders
    }
  )
}

const makeScene: () => Scene = () => {
  const scene      = new Scene()
  scene.background = new Color(ColorSpec.background)
  return scene
}

const makeRenderer: () => WebGLRenderer = () => {
  const renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)

  document.body.appendChild(renderer.domElement)

  return renderer
}

const makeCamera: () => OrthographicCamera = () => {
  const camera = new OrthographicCamera
    ( frustumSize * aspectRatio / - 2
    , frustumSize * aspectRatio / 2
    , frustumSize / 2
    , frustumSize / - 2
    , 1
    , frustumSize * 2
    )
  
  camera.position.z = 100
  camera.lookAt(new Vector3(0, 0, 0))

  return camera
}