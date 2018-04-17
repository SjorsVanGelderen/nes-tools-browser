import
  { List
  , Range
  } from "immutable"

import
  { Point
  , Dimensions
  , surfaceContains
  } from "../utils"

import
  { frustumSize
  , aspectRatio
  } from "../screen"

import
  { Mailbox
  } from "../Models/mail"

import
  { State
  } from "../Models/state"

import
  { Palette
  , PaletteColor
  , PaletteState
  , fullPalette
  } from "../Models/palette"

export const paletteDimensions: Dimensions =
  { w: frustumSize / 4
  , h: frustumSize
  }

export const palettePosition: Point =
  { x: (frustumSize * aspectRatio) / 2 - paletteDimensions.w / 2
  , y: 0
  }

export const paletteStateZero: PaletteState = 
  { position   : palettePosition
  // , background : 64
  }

export const paletteData: List<number> =
  Range(0, 64).flatMap((_, i) => {
    if(i == undefined) return List<number>()

    const p: PaletteColor = fullPalette.get(i)
    return List([ p.r, p.g, p.b ])
  }).toList()

const getPaletteSelection: (p: Point) => number = (p: Point) => {
  const pos: Point =
    { x: -((palettePosition.x - paletteDimensions.w / 2 - p.x) / paletteDimensions.w)
    , y: -((palettePosition.y - paletteDimensions.h / 2 + p.y) / paletteDimensions.h)
    }

  return Math.floor(pos.x * 4) + 4 * Math.floor(pos.y * 16)
}

export const updatePalette: (s: State) => State = (s: State) => {
  const i  = s.input
  const m  = i.mouse
  const p  = s.palette
  const mb = s.mailbox

  const selection =
    m.click.kind == "some"
      ? surfaceContains(palettePosition, paletteDimensions, m.click.value)
          ? getPaletteSelection(m.click.value)
          : "none"
      : "none"

  const sm = selection != "none"
    ? mb.samplesMail.push(
      { kind         : "ModifySample"
      , paletteIndex : selection
      }
    )
    : mb.samplesMail

  const newMb    : Mailbox = { ...mb, samplesMail: sm }
  const newState : State   = { ...s, mailbox: newMb }
  return newState
}