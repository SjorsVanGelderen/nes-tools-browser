import
  { List
  , Range
  } from "immutable"

import
  { Point
  , Dimensions
  } from "./utils/utils"

import
  { frustumSize
  , aspectRatio
  } from "./screen"

import
  { ToneMap
  , toneMapZero
  , toneMapToData
  } from "./tone";

import
  { Palette
  , PaletteColor
  , fullPalette
  } from "./palette"

import
  { State
  } from "./state"

export type CharacterState =
  { character: Character
  }

export type Character = 
  { map:  ToneMap
  , size: number
  , data: ImageData
  }

export const characterDimensions: Dimensions =
  { w: frustumSize * 0.8
  , h: frustumSize * 0.8
  }

export const characterPosition: Point =
  { x: 0
  , y: 0
  }

const makeCharacter: (size: number) => Character = (size: number) => (
  { map:  toneMapZero(size)
  , size: size
  , data: new ImageData(size, size)
  }
)

export const characterStateZero: CharacterState =
  { character: makeCharacter(128)
  }

export const characterData: () => List<number> = () =>
  Range(0, 128 ** 2).flatMap((_, i) => {
      if(i == undefined) return List<number>()

      const p: PaletteColor = fullPalette.get(Math.floor(Math.random() * 4))
      return List([ p.r, p.g, p.b ])
    }
  ).toList()


export const updateCharacter: (s: State) => State = (s: State) => {
  return s
}