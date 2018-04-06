import
  { List
  } from "immutable"

import
  { Point
  } from "../utils"

export type PaletteMail = never

export type SamplesMail =
  { kind         : "ModifySample"
  , samplesIndex : number
  , paletteIndex : number
  }

export type CharacterMail
  = { kind : "SetPixel" , value : never  }
  | { kind : "Zoom"     , value : number }

export type InputMail
  = { kind : "MouseMove"  , value : Point }
  | { kind : "MouseClick" , value : Point }

export type ThreeMail
  = { kind : "MakeSamplesMesh"   }
  | { kind : "MakePaletteMesh"   }
  | { kind : "MakeCharacterMesh" }

export type Mailbox =
  { paletteMail   : List<PaletteMail>
  , samplesMail   : List<SamplesMail>
  , characterMail : List<CharacterMail>
  , inputMail     : List<InputMail>
  , threeMail     : List<ThreeMail>
  }