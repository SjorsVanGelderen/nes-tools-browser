import
  { run
  } from "./utils/utils"

import
  { flush
  } from "./input"

import
  { State
  , stateZero
  } from "./state"

import
  { updateThree
  } from "./three/three"

import
  { updateInput
  } from "./input"

import
  { updateCharacter
  } from "./character"

import
  { updatePalette
  } from "./palette"

import
  { updateSamples
  } from "./samples"

import
  { updateMailbox
  } from "./mail"

const updateApp: (s: State) => State = (s: State) => {
  return s
}

const update: (s: State) => void = (s: State) => {
  const newState: State =
    run
      (updateApp)
      (updateInput)
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

  window.requestAnimationFrame(() => update(s))
}

const start: () => void = () => {
  const state: State = stateZero()
  window.requestAnimationFrame(() => update(state))
}

start()