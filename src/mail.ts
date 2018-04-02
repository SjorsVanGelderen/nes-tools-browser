import
  { List
  } from "immutable"

import
  { Point
  } from "./utils/utils"

import
  { State
  } from "./state"

export type PaletteMail = never

export type SamplesMail =
  { kind: "ModifySample"
  , index: number
  , paletteIndex: number
  }

export type CharacterMail
  = { kind: "SetPixel", value: never }
  | { kind: "Zoom", value: number }

export type InputMail
  = { kind: "MouseMove", value: Point }
  | { kind: "MouseClick", value: Point}

export type ThreeMail
  = { kind: "MakeSamplesMesh" }
  | { kind: "MakePaletteMesh" }
  | { kind: "MakeCharacterMesh" }


export type Mailbox =
  { paletteMail:   List<PaletteMail>
  , samplesMail:   List<SamplesMail>
  , characterMail: List<CharacterMail>
  , inputMail:     List<InputMail>
  , threeMail:     List<ThreeMail>
  }

export const mailboxZero: Mailbox =
  { paletteMail:   List()
  , samplesMail:   List()
  , characterMail: List()
  , inputMail:     List()
  , threeMail:     List()
  }


export const updateMailbox: (s: State) => State = (s: State) => {
  return { ...s, mailbox: mailboxZero }
}