import
  { PlaneGeometry
  , Geometry
  , Vector2
  , Vector3
  , RGBFormat
  , DataTexture
  , ShaderMaterial
  , Mesh
  , Shader
  , Uniform
  , Texture
  } from "three"

import
  { List
  , Range
  } from "immutable"

import
  { Point
  } from "../utils/utils"

import
  { paletteVert
  , paletteFrag
  } from "./shaders/palette"

import
  { samplesVert
  , samplesFrag
  } from "./shaders/samples"

import
  { characterVert
  , characterFrag
  } from "./shaders/character"

import
  { paletteData
  , palettePosition
  , paletteDimensions
  } from "../palette"

import
  { samplesData
  , samplesPosition
  , samplesDimensions
  } from "../samples"

import
  { characterData
  , characterPosition
  , characterDimensions
  } from "../character"

export type PaletteUniforms =
  { texture:       Uniform
  , mousePosition: Uniform
  }

export type PaletteShaderData =
  { uniforms:       PaletteUniforms
  , vertexShader:   string
  , fragmentShader: string
  }

export type SamplesUniforms =
  { texture:       Uniform
  , mousePosition: Uniform
  }

export type SamplesShaderData =
  { uniforms:       SamplesUniforms
  , vertexShader:   string
  , fragmentShader: string
  }

export type CharacterUniforms =
  { texture:       Uniform
  , mousePosition: Uniform
  }

export type CharacterShaderData =
  { uniforms:       CharacterUniforms
  , vertexShader:   string
  , fragmentShader: string
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
      { texture:       new Uniform(texture)
      , mousePosition: new Uniform(new Vector2(0, 0))
      }

    const shaderData: PaletteShaderData =
      { uniforms:       uniforms
      , vertexShader:   paletteVert
      , fragmentShader: paletteFrag
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

export const makeSamplesMesh: () => Mesh = 
  () => {
    const dataArray = new Uint8Array(samplesData().toArray())

    const texture = new DataTexture(dataArray, 1, 10, RGBFormat)
    texture.needsUpdate = true

    const uniforms: SamplesUniforms =
      { texture:       new Uniform(texture)
      , mousePosition: new Uniform(new Vector2(0, 0))
      }

    const shaderData: SamplesShaderData =
      { uniforms:       uniforms
      , vertexShader:   samplesVert
      , fragmentShader: samplesFrag
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

export const makeCharacterMesh: () => Mesh = 
  () => {
    const dataArray = new Uint8Array(characterData().toArray())

    const texture = new DataTexture(dataArray, 128, 128, RGBFormat)
    texture.needsUpdate = true

    const uniforms: CharacterUniforms =
      { texture:       new Uniform(texture)
      , mousePosition: new Uniform(new Vector2(0, 0))
      }

    const shaderData: CharacterShaderData =
      { uniforms:       uniforms
      , vertexShader:   characterVert
      , fragmentShader: characterFrag
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