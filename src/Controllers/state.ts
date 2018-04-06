import
  { threeStateZero
  } from "./three"

import
  { inputStateZero
  } from "./input"

import
  { characterStateZero
  } from "./character"

import
  { paletteStateZero
  } from "./palette"

import
  { samplesStateZero
  } from "./samples"

import
  { mailboxZero
  } from "./mail"

import
  { State
  } from "../Models/state"

export const stateZero: () => State = () => (
  { three     : threeStateZero()
  , input     : inputStateZero()
  , character : characterStateZero
  , palette   : paletteStateZero
  , samples   : samplesStateZero
  , mailbox   : mailboxZero
  }
)