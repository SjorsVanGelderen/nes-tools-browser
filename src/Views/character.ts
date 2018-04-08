import
  { Uniform
  , Mesh
  , ShaderMaterial
  , DataTexture
  , RGBFormat
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
  { Mailbox
  } from "../Models/mail"

import
  { characterData
  , characterPosition
  , characterDimensions
  } from "../Controllers/character"

import
  { characterVert
  , characterFrag
  } from "./Shaders/character"

export type CharacterUniforms =
  { texture       : Uniform
  , mousePosition : Uniform
  }

export type CharacterShaderData =
  { uniforms       : CharacterUniforms
  , vertexShader   : string
  , fragmentShader : string
  }

export async function makeCharacterMesh(): Promise<Option<Mesh>> {
  const dataArray = new Uint8Array(characterData().toArray())

  const texture = new DataTexture(dataArray, 128, 128, RGBFormat)
  texture.needsUpdate = true

  const uniforms: CharacterUniforms =
    { texture       : new Uniform(texture)
    , mousePosition : new Uniform(new Vector2(0, 0))
    }

  const vert = await characterVert()
  if(vert.kind == "none") return emptyOpt<Mesh>()

  const frag = await characterFrag()
  if(frag.kind == "none") return emptyOpt<Mesh>()

  const shaderData: CharacterShaderData =
    { uniforms       : uniforms
    , vertexShader   : vert.value
    , fragmentShader : frag.value
    }

  const dimensions = new Vector2(characterDimensions.w, characterDimensions.h)
  const material   = new ShaderMaterial(shaderData)
  const geometry   = makeSurfaceGeometry(dimensions)
  const character  = new Mesh(geometry, material)

  character.matrixAutoUpdate = false
  character.position.set(characterPosition.x, characterPosition.y, -1)
  character.updateMatrix()

  return makeOpt(character)
}

export const updateCharacterView: (s: State, m: Mesh) => void = (s: State, m: Mesh) => {
  const mp = s.input.mouse.position
  const mb = s.mailbox.characterMail

  const pos:  Point =
    { x: -((m.position.x - characterDimensions.w / 2 - mp.x) / characterDimensions.w)
    , y: -((m.position.y - characterDimensions.h / 2 + mp.y) / characterDimensions.h)
    }

  const sh : ShaderMaterial    = m.material  as ShaderMaterial
  const u  : CharacterUniforms = sh.uniforms as CharacterUniforms
  
  u.mousePosition.value = pos

  // mb.forEach(x => {

  // })
}

  // const m : Point      = s.input.mouse.position
  // const t : ThreeState = s.three
  // const c : Mesh       = t.meshes.get("character")

  

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
