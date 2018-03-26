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
  { Point
  , Dimensions
  } from "../utils/utils"

import
  { frustumSize
  , aspectRatio
  } from "../screen"

import
  { makeFullPaletteMesh
  , makeSamplesMesh
  , makeCharacterMesh
  } from "./mesh"

import
  { PaletteState
  , palettePosition
  , paletteDimensions
  } from "../palette"

import
  { PaletteUniforms
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
    , [ "character", makeCharacterMesh()   ]
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

export const updateThreePalette: (s: ThreeState, pa: PaletteState, mousePosition: Point) => void =
  (s: ThreeState, pa: PaletteState, mousePosition: Point) => {
    const p: Mesh = s.meshes.get("palette")

    const pos:  Point =
      { x: -((p.position.x - paletteDimensions.w / 2 - mousePosition.x) / paletteDimensions.w)
      , y: -((p.position.y - paletteDimensions.h / 2 + mousePosition.y) / paletteDimensions.h)
      }

    const ps: ShaderMaterial  = p.material  as ShaderMaterial
    const u:  PaletteUniforms = ps.uniforms as PaletteUniforms
    
    u.mousePosition.value = pos
  }