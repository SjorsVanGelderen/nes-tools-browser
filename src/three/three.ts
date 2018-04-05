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
  , Uniform
  , Vector2
  , Vector3
  , PlaneGeometry
  , DataTexture
  , RGBFormat
  , Geometry
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
  { onClick
  , onMove
  , onScroll
  , onKeyPress
  } from "../input"

import
  { PaletteState
  , palettePosition
  , paletteDimensions
  , paletteData
  } from "../palette"

import
  { paletteVert
  , paletteFrag
  } from "./shaders/palette"

import
  { samplesVert
  , samplesFrag
  } from "./shaders/samples"

import
  { samplesData
  , samplesPosition
  , samplesDimensions
  } from "../samples"

import
  { characterVert
  , characterFrag
  } from "./shaders/character"

import
  { characterData
  , characterPosition
  , characterDimensions
  } from "../character"

import
  { State
  } from "../state"

export type ThreeState =
  { scene    : Scene
  , camera   : OrthographicCamera
  , renderer : WebGLRenderer
  , meshes   : Map<string, Mesh>
  , shaders  : Map<string, ShaderMaterial>
  }

namespace Palette {
  export type PaletteUniforms =
    { texture       : Uniform
    , mousePosition : Uniform
    }

  export type PaletteShaderData =
    { uniforms       : PaletteUniforms
    , vertexShader   : string
    , fragmentShader : string
    }

  export const updatePalette: (s: State) => void = (s: State) => {
    const m : Point      = s.input.mouse.position
    const t : ThreeState = s.three
    const p : Mesh       = t.meshes.get("palette")

    const pos: Point =
      { x: -((p.position.x - paletteDimensions.w / 2 - m.x) / paletteDimensions.w)
      , y: -((p.position.y - paletteDimensions.h / 2 + m.y) / paletteDimensions.h)
      }

    const ps: ShaderMaterial  = p.material  as ShaderMaterial
    const u:  PaletteUniforms = ps.uniforms as PaletteUniforms
    
    u.mousePosition.value = pos
  }

  export const makeFullPaletteMesh: () => Mesh = 
    () => {
      const resolution = { x: 4, y: 16 }
      const dataArray  = new Uint8Array(paletteData.toArray())

      const texture = new DataTexture
        ( dataArray
        , resolution.x
        , resolution.y
        , RGBFormat
        )
      
      texture.needsUpdate = true

      const uniforms: PaletteUniforms =
        { texture       : new Uniform(texture)
        , mousePosition : new Uniform(new Vector2(0, 0))
        }

      const shaderData: PaletteShaderData =
        { uniforms       : uniforms
        , vertexShader   : paletteVert
        , fragmentShader : paletteFrag
        }

      const dimensions = new Vector2(paletteDimensions.w, paletteDimensions.h)
      const material   = new ShaderMaterial(shaderData)
      const geometry   = makeSurfaceGeometry(dimensions)
      const palette    = new Mesh(geometry, material)

      palette.matrixAutoUpdate = false
      palette.position.set(palettePosition.x, palettePosition.y, 0)
      palette.updateMatrix()

      return palette
    }
}

namespace Character {
  export type CharacterUniforms =
    { texture       : Uniform
    , mousePosition : Uniform
    }

  export type CharacterShaderData =
    { uniforms       : CharacterUniforms
    , vertexShader   : string
    , fragmentShader : string
    }

  export const updateCharacter: (s: State) => void = (s: State) => {
    const m : Point      = s.input.mouse.position
    const t : ThreeState = s.three
    const c : Mesh       = t.meshes.get("character")
  
    const pos:  Point =
      { x: -((c.position.x - characterDimensions.w / 2 - m.x) / characterDimensions.w)
      , y: -((c.position.y - characterDimensions.h / 2 + m.y) / characterDimensions.h)
      }
  
    const cs : ShaderMaterial    = c.material  as ShaderMaterial
    const u  : CharacterUniforms = cs.uniforms as CharacterUniforms
    
    u.mousePosition.value = pos
  }

  export const makeCharacterMesh: () => Mesh = 
    () => {
      const dataArray = new Uint8Array(characterData().toArray())

      const texture = new DataTexture(dataArray, 128, 128, RGBFormat)
      texture.needsUpdate = true

      const uniforms: CharacterUniforms =
        { texture       : new Uniform(texture)
        , mousePosition : new Uniform(new Vector2(0, 0))
        }

      const shaderData: CharacterShaderData =
        { uniforms       : uniforms
        , vertexShader   : characterVert
        , fragmentShader : characterFrag
        }

      const dimensions = new Vector2(characterDimensions.w, characterDimensions.h)
      const material   = new ShaderMaterial(shaderData)
      const geometry   = makeSurfaceGeometry(dimensions)
      const character  = new Mesh(geometry, material)

      character.matrixAutoUpdate = false
      character.position.set(characterPosition.x, characterPosition.y, -1)
      character.updateMatrix()

      return character
    }

// export const makeCharacterMesh: () => Mesh = () => {
//   const characterSize: number = 16
//   const characterData: List<number> = Range(0, characterSize ** 2 * 3).map(x => 255).toList()
  
//   const character: Mesh = makeSurface
//     (new Vector2(frustumSize * aspectRatio / - 2, frustumSize * aspectRatio / - 2))
//     (new Vector2(characterSize, characterSize))
//     (characterData)
  
//   character.position.set(-300, 0, 0)
//   return character
// }

// export const characterToSurface: (p: Palette) => (c: Character) => Uint8ClampedArray =
//   (p: Palette) => (c: Character) => {
//     const data: Uint8ClampedArray = toneMapToData(p)(c.map.tones).toArray()
//     return data
//   }
}

namespace Samples {
  export type SamplesUniforms =
    { texture       : Uniform
    , mousePosition : Uniform
    }

  export type SamplesShaderData =
    { uniforms       : SamplesUniforms
    , vertexShader   : string
    , fragmentShader : string
    }

  export const makeSamplesMesh: () => Mesh = 
    () => {
      const dataArray = new Uint8Array(samplesData().toArray())
  
      const texture = new DataTexture(dataArray, 1, 10, RGBFormat)
      texture.needsUpdate = true
  
      const uniforms: SamplesUniforms =
        { texture       : new Uniform(texture)
        , mousePosition : new Uniform(new Vector2(0, 0))
        }
  
      const shaderData: SamplesShaderData =
        { uniforms       : uniforms
        , vertexShader   : samplesVert
        , fragmentShader : samplesFrag
        }
  
      const dimensions = new Vector2(samplesDimensions.w, samplesDimensions.h)
      const material   = new ShaderMaterial(shaderData)
      const geometry   = makeSurfaceGeometry(dimensions)
      const samples    = new Mesh(geometry, material)
  
      samples.matrixAutoUpdate = false
      samples.position.set(samplesPosition.x, samplesPosition.y, 0)
      samples.updateMatrix()
  
      return samples
    }

  // export const updateSamplesDataTexture: () => void = () => {
  //   const dataArray = new Uint8Array(samplesData().toArray())

  //   const texture = new DataTexture(dataArray, 1, 10, RGBFormat)
  //   texture.needsUpdate = true

  //   const uniforms: SamplesUniforms =
  //     { texture:       new Uniform(texture)
  //     , mousePosition: new Uniform(new Vector2(0, 0))
  //     }

  //   const shaderData: SamplesShaderData =
  //     { uniforms:       uniforms
  //     , vertexShader:   samplesVert
  //     , fragmentShader: samplesFrag
  //     }

  //   const dimensions = new Vector2(samplesDimensions.w, samplesDimensions.h)
  //   const material   = new ShaderMaterial(shaderData)
  //   const geometry   = makeSurfaceGeometry(dimensions)
  //   const samples    = new Mesh(geometry, material)

  //   samples.matrixAutoUpdate = false
  //   samples.position.set(samplesPosition.x, samplesPosition.y, 0)
  //   samples.updateMatrix()

  //   return samples
  // }
}

export const threeStateZero: () => ThreeState = () => {
  const scene    : Scene              = makeScene()
  const camera   : OrthographicCamera = makeCamera()
  const renderer : WebGLRenderer      = makeRenderer()

  const meshes = Map<string, Mesh>(
    [ [ "palette"   , Palette.makeFullPaletteMesh() ]
    , [ "samples"   , Samples.makeSamplesMesh()     ]
    , [ "character" , Character.makeCharacterMesh() ]
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

const makeSurfaceGeometry: (dimensions: Vector2) => Geometry =
  (dimensions: Vector2) => {
    const geometry = new PlaneGeometry
      ( dimensions.x
      , dimensions.y
      , 32
      )
    
    return geometry
  }

export const updateThree: (s: State) => State = (s: State) => {
  Palette.updatePalette(s)
  Character.updateCharacter(s)
  return s
}