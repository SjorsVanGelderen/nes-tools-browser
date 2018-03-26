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
  { paletteData
  , palettePosition
  , paletteDimensions
  } from "../palette"

import
  { samplesData
  , samplesPosition
  , samplesDimensions
  } from "../samples"

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

    const texture = new DataTexture(dataArray, 10, 1, RGBFormat)
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