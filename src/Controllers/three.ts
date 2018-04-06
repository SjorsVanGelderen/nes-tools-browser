import
  { Map
  } from "immutable"

import
  { Scene
  , OrthographicCamera
  , WebGLRenderer
  , ShaderMaterial
  , Color
  , Geometry
  , PlaneGeometry
  , Vector2
  , Vector3
  , Mesh
  } from "three"

import * as ColorSpec from "../color"

import
  { frustumSize
  , aspectRatio
  } from "../screen"

import
  { onClick
  , onKeyPress
  , onMove
  , onScroll
  } from "./input"

import
  { State
  } from "../Models/state"

import
  { ThreeState
  } from "../Models/three"

import
  { makeFullPaletteMesh
  } from "../Views/palette"

import
  { makeSamplesMesh 
  } from "../Views/samples"

import
  { makeCharacterMesh
  } from "../Views/character"

export const threeStateZero: () => ThreeState = () => {
  const scene    : Scene              = makeScene()
  const camera   : OrthographicCamera = makeCamera()
  const renderer : WebGLRenderer      = makeRenderer()

  const meshes = Map<string, Mesh>(
    [ [ "palette"   , makeFullPaletteMesh() ]
    , [ "samples"   , makeSamplesMesh()     ]
    , [ "character" , makeCharacterMesh()   ]
    ]
  )

  meshes.valueSeq().forEach(x => x != undefined ? scene.add(x) : {})

  const shaders = Map<string, ShaderMaterial>()

  return (
    { scene    : scene
    , camera   : camera
    , renderer : renderer
    , meshes   : meshes
    , shaders  : shaders
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

  const element: HTMLCanvasElement = document.body.appendChild(renderer.domElement)

  element.addEventListener("mousemove", onMove,     false)
  element.addEventListener("mousedown", onClick,    false)
  // element.addEventListener("scroll",    onScroll, false)

  // Adding to element doesn't seem to work
  window.addEventListener("keypress",  onKeyPress, false)

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

export const makeSurfaceGeometry: (dimensions: Vector2) => Geometry =
  (dimensions: Vector2) => {
    const geometry = new PlaneGeometry
      ( dimensions.x
      , dimensions.y
      , 32
      )
    
    return geometry
  }

export const updateThree: (s: State) => State = (s: State) => {
  // Palette.updatePalette(s)
  // Character.updateCharacter(s)
  return s
}