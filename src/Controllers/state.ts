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

export async function stateZero(): Promise<State> {
  return (
    { three     : await threeStateZero()
    , input     : inputStateZero()
    , character : characterStateZero
    , palette   : paletteStateZero
    , samples   : samplesStateZero
    , mailbox   : mailboxZero
    }
  )
}