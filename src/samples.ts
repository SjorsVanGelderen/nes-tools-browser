import
  { List
  } from "immutable"

import
  { Point
  , Dimensions
  , rectContains
  } from "./utils/utils"

import
  { frustumSize
  , aspectRatio
  } from "./screen"

import
  { Mailbox
  } from "./mail"

import
  { PaletteColor
  , fullPalette
  } from "./palette"

import
  { State
  } from "./state"

export type Sample = List<number>

export type SamplesState =
  { samples    : List<Sample>
  , background : number
  , active     : number
  }

export const samplesStateZero: SamplesState =
  { samples: List<Sample>(
      [ List([ 0,  1,  2 ])
      , List([ 3,  4,  5 ])
      , List([ 6,  7,  8 ])
      , List([ 9, 10, 11 ])
      ]
    )
  , background : 0
  , active     : 0
  }

export const samplesDimensions: Dimensions =
  { w: frustumSize / 16
  , h: frustumSize / 16 * 10
  }

export const samplesPosition: Point =
  { x: -frustumSize * aspectRatio / 2 + samplesDimensions.w / 2
  , y: 0
  }

export const samplesData: () => List<number> = () => {
  const b = fullPalette.get(samplesStateZero.background)

  return samplesStateZero.samples.flatMap(x => {
    if(x == undefined) return List<number>()

    const p = List<PaletteColor>(
      [ fullPalette.get(x.get(0))
      , fullPalette.get(x.get(1))
      , fullPalette.get(x.get(2))
      ]
    )

    const result: List<number> =
      p.flatMap(c => c == undefined
        ? List<number>()
        : List([ c.r, c.g, c.b ])
      ).toList()
    
    return result
  })
  .concat(List([ b.r, b.g, b.b ]))
  .toList()
}

export const updateSamples: (s: State) => State = (s: State) => {
  const sp = s.samples
  const sm = sp.samples
  const mb = s.mailbox
  const m  = s.input.mouse

  const modMail = mb.samplesMail.find(x => x != undefined ? x.kind == "ModifySample" : false)

  const newSm: List<Sample> = modMail
    ? sm.setIn([sp.active, modMail.samplesIndex], modMail.paletteIndex)
    : sm
  
  if(m.click.kind == "some") {
    
  }

  const newActive = m.click.kind == "some"
    ? rectContains(samplesPosition, samplesDimensions, m.click.value)
      ? 4
      : 0
    : sp.active

  const newState: State =
    { ...s
    , samples:
      { ...s.samples
      , samples: newSm
      , active: newActive
      }
    , mailbox: { ...mb, samplesMail: List() }
    }
  
  return newState
}