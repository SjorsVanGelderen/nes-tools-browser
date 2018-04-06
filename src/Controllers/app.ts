import
  { run
  } from "../utils"

import
  { flush
  , updateInput
  } from "./input"

import
  { State
  } from "../Models/state"

import
  { stateZero
  } from "../Controllers/state"

import
  { updateThree
  } from "./three"

import
  { updatePalette
  } from "./palette"

import
  { updateSamples
  } from "./samples"

import
  { updateCharacter
  } from "./character"

import
  { updateMailbox
  } from "./mail"

const updateApp: (s: State) => State = (s: State) => {
  return s
}

const tick: (s: State) => void = (s: State) => {
  const newState: State =
    run
      (updateInput)
      (updateApp)
      (updateCharacter)
      (updatePalette)
      (updateSamples)
      (updateThree)
      (updateMailbox)
    ("with")
      (s)

  flush() // Flush input buffers

  const t = s.three
  t.renderer.render(t.scene, t.camera)

  window.requestAnimationFrame(() => tick(newState))
}

const start: () => void = () => {
  const state: State = stateZero()
  window.requestAnimationFrame(() => tick(state))
}

start()