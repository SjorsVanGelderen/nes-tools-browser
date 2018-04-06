import
  { List
  , Range
  } from "immutable"

import
  { Option
  , makeOpt
  , emptyOpt
  } from "../utils"

import
  { Palette
  } from "../Models/palette"

import
  { ToneMap
  , Tone
  } from "../Models/tone"

export const toneMapZero: (size: number) => ToneMap =
  (size: number) => (
    { tones: Range(0, 128 ** 2).map(x => Math.floor(Math.random() * 4) as Tone).toList()
    , size:  size
    , dirty: true
    }
  )

export const getTone: (x: number, y: number) => (m: ToneMap) => Option<Tone> =
  (x: number, y: number) => (m: ToneMap) => {
    const tone = m.tones.get(x + y * m.size)
    return tone != undefined 
      ? makeOpt(tone)
      : emptyOpt()
  }

export const setTone: (x: number, y: number) => (m: ToneMap) => (t: Tone) => ToneMap =
  (x: number, y: number) => (m: ToneMap) => (t: Tone) => {
    const location = x + y * m.size
    return m.tones.count() > location
      ? { ...m, tones: m.tones.set(location, t) }
      : m
  }

export const toneMapToData: (p: Palette) => (t: List<Tone>) => List<number> =
  (p: Palette) => (t: List<Tone>) => List<number>(
    t.flatMap(i => i != undefined
      ? p.skip(i * 4).take(4)
      : [ 255, 0, 0, 0 ]
    )
  )