import
  { ToneMap
  } from "./tone"

export type CharacterState =
  { character : Character
  , zoom      : number
  }

export type Character = 
  { map  : ToneMap
  , size : number
  , data : ImageData
  }