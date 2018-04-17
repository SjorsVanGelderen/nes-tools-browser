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
  { Option
  , makeOpt
  , emptyOpt
  , Point
  } from "../utils"

import
  { makeSurfaceGeometry
  } from "../Controllers/three"

import
  { State
  } from "../Models/state"

import
  { samplesData
  , samplesPosition
  , samplesDimensions
  , samplesStateZero
  } from "../Controllers/samples"

import
  { samplesVert
  , samplesFrag
  } from "./Shaders/samples"

export type SamplesUniforms =
  { texture       : Uniform
  , mousePosition : Uniform
  , activeSample  : Uniform
  }

export type SamplesShaderData =
  { uniforms       : SamplesUniforms
  , vertexShader   : string
  , fragmentShader : string
  }

export async function makeSamplesMesh(): Promise<Option<Mesh>> { 
  const dataArray = new Uint8Array(samplesData(samplesStateZero).toArray())

  const texture = new DataTexture(dataArray, 1, 10, RGBFormat)
  texture.needsUpdate = true

  const uniforms: SamplesUniforms =
    { texture       : new Uniform(texture)
    , mousePosition : new Uniform(new Vector2(0, 0))
    , activeSample  : new Uniform(0)
    }

  const vert = await samplesVert()
  if(vert.kind == "none") return emptyOpt()

  const frag = await samplesFrag()
  if(frag.kind == "none") return emptyOpt()

  const shaderData: SamplesShaderData =
    { uniforms       : uniforms
    , vertexShader   : vert.value
    , fragmentShader : frag.value
    }

  const dimensions = new Vector2(samplesDimensions.w, samplesDimensions.h)
  const material   = new ShaderMaterial(shaderData)
  const geometry   = makeSurfaceGeometry(dimensions)
  const samples    = new Mesh(geometry, material)

  samples.matrixAutoUpdate = false
  samples.position.set(samplesPosition.x, samplesPosition.y, 0)
  samples.updateMatrix()

  return makeOpt(samples)
}

export const updateSamplesView: (s: State, sm: Mesh) => void = (s: State, sm: Mesh) => {
  const mp = s.input.mouse.position

  const pos: Point =
    { x: -((sm.position.x - samplesDimensions.w / 2 - mp.x) / samplesDimensions.w)
    , y: -((sm.position.y - samplesDimensions.h / 2 + mp.y) / samplesDimensions.h)
    }

  const dataArray = new Uint8Array(samplesData(s.samples).toArray())

  const texture = new DataTexture(dataArray, 1, 10, RGBFormat)
  texture.needsUpdate = true

  const sh: ShaderMaterial  = sm.material as ShaderMaterial
  const u:  SamplesUniforms = sh.uniforms as SamplesUniforms
  
  u.mousePosition.value = pos
  u.texture.value       = texture
  u.activeSample.value  = s.samples.activeSample
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