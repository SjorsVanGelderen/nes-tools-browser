import
  { ThreeState
  , threeStateZero
  } from "./three/three"

import
  { InputState
  , inputStateZero
  } from "./input"

import
  { CharacterState
  , characterStateZero
  } from "./character"

import
  { PaletteState
  , paletteStateZero
  } from "./palette"

import
  { SamplesState
  , samplesStateZero
  } from "./samples"

import
  { Mailbox
  , mailboxZero
  } from "./mail"

export type State =
  { three:     ThreeState
  , input:     InputState
  , character: CharacterState
  , palette:   PaletteState
  , samples:   SamplesState
  , mailbox:   Mailbox
  }

export const stateZero: () => State = () => {
  return (
    { three:     threeStateZero()
    , input:     inputStateZero()
    , character: characterStateZero
    , palette:   paletteStateZero
    , samples:   samplesStateZero
    , mailbox:   mailboxZero
    }
  )
}