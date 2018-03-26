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
  } from "./input"

import
  { ThreeState
  } from "./three/three"

import
  { State
  , stateZero
  } from "./state"

const update: (_: State) => void =
  (state: State) => {
    const s: State = (
      { ...state
      , input: run(click(mouseClick))(move(mousePosition))("with")(state.input)
      }
    )
    
    const t: ThreeState = s.three

    //mouseClick = emptyOpt()

    // const p: Mesh = s.three.meshes.get("palette")
    // const pa: PaletteState = s.palette

    // const mPos: Point = mousePosition //s.input.mouse.position
    // const pos: Point =
    //   { x: -((p.position.x - pa.dimensions.w / 2 - mPos.x) / pa.dimensions.w)
    //   , y: -((p.position.y - pa.dimensions.h / 2 + mPos.y) / pa.dimensions.h)
    //   }

    // const ps: ShaderMaterial = p.material as ShaderMaterial
    // const u: PaletteUniforms = ps.uniforms as PaletteUniforms
    // u.mousePosition.value = pos

    s.three.renderer.render(state.three.scene, state.three.camera)

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