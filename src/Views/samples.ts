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
  } from "../Controllers/samples"

import
  { samplesVert
  , samplesFrag
  } from "./Shaders/samples"

export type SamplesUniforms =
  { texture       : Uniform
  , mousePosition : Uniform
  }

export type SamplesShaderData =
  { uniforms       : SamplesUniforms
  , vertexShader   : string
  , fragmentShader : string
  }

export async function makeSamplesMesh(): Promise<Option<Mesh>> { 
  const dataArray = new Uint8Array(samplesData().toArray())

  const texture = new DataTexture(dataArray, 1, 10, RGBFormat)
  texture.needsUpdate = true

  const uniforms: SamplesUniforms =
    { texture       : new Uniform(texture)
    , mousePosition : new Uniform(new Vector2(0, 0))
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