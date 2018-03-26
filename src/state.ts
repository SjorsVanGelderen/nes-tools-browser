import 
  { List
  } from "immutable"

import
  { Point
  , Option
  , emptyOpt
  } from "./utils/utils"

import
  { ThreeState
  , threeStateZero
  } from "./three/three"

import
  { InputState
  , inputStateZero
  } from "./input"

// import
//   { CharacterState
//   , characterStateZero
//   } from "./character"

import
  { CharacterMapState
  , characterMapStateZero
  } from "./character_map"

import
  { PaletteState
  , paletteStateZero
  } from "./palette"

import
  { SamplesState
  , samplesStateZero
  } from "./samples"

export type State =
  { three:        ThreeState
  , input:        InputState
  // , character:    CharacterState
  , characterMap: CharacterMapState
  , palette:      PaletteState
  , samples:      SamplesState
  }

export const stateZero: () => State = () => {
  return (
    { three:        threeStateZero()
    , input:        inputStateZero()
    // , character:    characterStateZero
    , characterMap: characterMapStateZero
    , palette:      paletteStateZero
    , samples:      samplesStateZero
    }
  )
}