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
  { Option
  , makeOpt
  , emptyOpt
  } from "../utils"

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
  , updateCharacterView
  } from "../Views/character"

export async function threeStateZero(): Promise<ThreeState> {
  const scene    : Scene              = makeScene()
  const camera   : OrthographicCamera = makeCamera()
  const renderer : WebGLRenderer      = makeRenderer()

  const paletteMesh   : Option<Mesh> = await makeFullPaletteMesh()
  const samplesMesh   : Option<Mesh> = await makeSamplesMesh()
  const characterMesh : Option<Mesh> = await makeCharacterMesh()

  const meshes = Map<string, Option<Mesh>>(
    [ [ "palette"   , paletteMesh   ]
    , [ "samples"   , samplesMesh   ]
    , [ "character" , characterMesh ]
    ]
  )

  meshes.valueSeq().forEach(x => x != undefined ? x.kind == "some" ? scene.add(x.value) : {} : {})

  // \const shaders = Map<string, ShaderMaterial>()

  return (
    { scene    : scene
    , camera   : camera
    , renderer : renderer
    , meshes   : meshes
    // , shaders  : shaders
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
  const t  = s.three
  const cm = t.meshes.get("character")
  const c  = cm != undefined ? cm : emptyOpt<Mesh>()

  if(c.kind == "some") updateCharacterView(s, c.value)

  return s
}