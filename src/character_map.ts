import
  { Point
  , pointZero
  } from "./utils/utils"

export type CharacterMapState =
  { position: Point
  , enabled:  boolean
  }

export const characterMapStateZero: CharacterMapState =
  { position: pointZero
  , enabled:  true
  }