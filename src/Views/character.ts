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
  } from "../utils"

import
  { makeSurfaceGeometry
  } from "../Controllers/three"

import
  { State
  } from "../Models/state"

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

export const updateCharacter: (s: State) => void = (s: State) => {
  // const m : Point      = s.input.mouse.position
  // const t : ThreeState = s.three
  // const c : Mesh       = t.meshes.get("character")

  // const pos:  Point =
  //   { x: -((c.position.x - characterDimensions.w / 2 - m.x) / characterDimensions.w)
  //   , y: -((c.position.y - characterDimensions.h / 2 + m.y) / characterDimensions.h)
  //   }

  // const cs : ShaderMaterial    = c.material  as ShaderMaterial
  // const u  : CharacterUniforms = cs.uniforms as CharacterUniforms
  
  // u.mousePosition.value = pos
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
