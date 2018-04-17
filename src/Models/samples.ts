import
  { List
  } from "immutable"

export type Sample = List<number>

export type SamplesState =
  { samples      : List<Sample>
  , background   : number
  , activeSample : number
  , activeIndex  : number
  , dirtyTexture : boolean
  }