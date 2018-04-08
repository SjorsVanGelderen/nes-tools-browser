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
  , Option
  , makeOpt
  , emptyOpt
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

export async function makeFullPaletteMesh(): Promise<Option<Mesh>> {
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

  const vert = await paletteVert()
  if(vert.kind == "none") return emptyOpt()

  const frag = await paletteFrag()
  if(frag.kind == "none") return emptyOpt()

  const shaderData: PaletteShaderData =
    { uniforms       : uniforms
    , vertexShader   : vert.value
    , fragmentShader : frag.value
    }

  const dimensions = new Vector2(paletteDimensions.w, paletteDimensions.h)
  const material   = new ShaderMaterial(shaderData)
  const geometry   = makeSurfaceGeometry(dimensions)
  const palette    = new Mesh(geometry, material)

  palette.matrixAutoUpdate = false
  palette.position.set(palettePosition.x, palettePosition.y, 0)
  palette.updateMatrix()

  return makeOpt(palette)
}

export const updatePaletteView: (s: State, p: Mesh) => void = (s: State, p: Mesh) => {
    const mp = s.input.mouse.position

    const pos: Point =
      { x: -((p.position.x - paletteDimensions.w / 2 - mp.x) / paletteDimensions.w)
      , y: -((p.position.y - paletteDimensions.h / 2 + mp.y) / paletteDimensions.h)
      }

    const sh: ShaderMaterial  = p.material  as ShaderMaterial
    const u:  PaletteUniforms = sh.uniforms as PaletteUniforms
    
    u.mousePosition.value = pos
}