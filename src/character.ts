import
  { List
  , Range
  } from "immutable"

import
  { frustumSize
  , aspectRatio
  } from "./screen"

// import
//   { makeSurface
//   } from "./mesh"

import
  { ToneMap
  , toneMapZero
  , toneMapToData
  } from "./tone";

import
  { Palette
  } from "./palette"

export type CharacterState =
  { character: Character
  }

export type Character = 
  { map:  ToneMap
  , size: number
  , data: ImageData
  }

const makeCharacter: (size: number) => Character =
  (size: number) => (
    { map:  toneMapZero(size)
    , size: size
    , data: new ImageData(size, size)
    }
  )

export const characterStateZero: CharacterState =
  { character: makeCharacter(128)
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