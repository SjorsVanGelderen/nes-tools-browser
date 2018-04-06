import
  { Uniform
  , ShaderMaterial
  , DataTexture
  , RGBFormat
  , Mesh
  , Vector2
  , Vector3
  } from "three"

import
  { Point
  } from "../utils"

import
  { makeSurfaceGeometry
  } from "../Controllers/three"

import
  { State
  } from "../Models/state"

import
  { paletteData
  , palettePosition
  , paletteDimensions
  } from "../Controllers/palette"

import
  { paletteVert
  , paletteFrag
  } from "./Shaders/palette"

export type PaletteUniforms =
  { texture       : Uniform
  , mousePosition : Uniform
  }

export type PaletteShaderData =
  { uniforms       : PaletteUniforms
  , vertexShader   : string
  , fragmentShader : string
  }

export const makeFullPaletteMesh: () => Mesh = () => {
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

export const updatePalette: (s: State) => void = (s: State) => {
    // const m : Point      = s.input.mouse.position
    // const t : ThreeState = s.three
    // const p : Mesh       = t.meshes.get("palette")

    // const pos: Point =
    //   { x: -((p.position.x - paletteDimensions.w / 2 - m.x) / paletteDimensions.w)
    //   , y: -((p.position.y - paletteDimensions.h / 2 + m.y) / paletteDimensions.h)
    //   }

    // const ps: ShaderMaterial  = p.material  as ShaderMaterial
    // const u:  PaletteUniforms = ps.uniforms as PaletteUniforms
    
    // u.mousePosition.value = pos
}