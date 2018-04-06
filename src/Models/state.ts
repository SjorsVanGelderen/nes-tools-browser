import
  { ThreeState 
  } from "./three"

import 
  { InputState 
  } from "./input"

import 
  { CharacterState
  } from "./character"

import 
  { PaletteState
  } from "./palette"

import 
  { SamplesState 
  } from "./samples"

import 
  { Mailbox
  } from "./mail"

export type State =
  { three     : ThreeState
  , input     : InputState
  , character : CharacterState
  , palette   : PaletteState
  , samples   : SamplesState
  , mailbox   : Mailbox
  }