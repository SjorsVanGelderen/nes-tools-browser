import
  { List
  } from "immutable"

export type Tone = 0 | 1 | 2 | 3

export type ToneMap =
  { tones: List<Tone>
  , size:  number
  , dirty: boolean
  }