import
  { List
  } from "immutable"

import
  { Point
  , Option
  , makeOpt
  , emptyOpt
  , run
  } from "./utils/utils"

import
  { frustumSize
  , aspectRatio
  } from "./screen"

import
  { click
  , move
  , onMove
  , onClick
  , mouseClick
  , mousePosition
  , flush
  } from "./input"

import
  { ThreeState
  , updateThreePalette
  } from "./three/three"

import
  { State
  , stateZero
  } from "./state"

const update: (state: State) => void =
  (state: State) => {
    const s: State = (
      { ...state
      , input: run(click(mouseClick))(move(mousePosition))("with")(state.input)
      }
    )

    flush()

    const t: ThreeState = s.three
    updateThreePalette(t, s.palette, s.input.mouse.position)
    t.renderer.render(t.scene, t.camera)

    window.requestAnimationFrame(() => update(s))
  }

const start: () => void = () => {
    const state: State = stateZero()

    const renderer: HTMLCanvasElement = state.three.renderer.domElement

    renderer.addEventListener("mousemove", onMove,  false)
    renderer.addEventListener("mousedown", onClick, false)

    window.requestAnimationFrame(() => update(state))
  }

start()