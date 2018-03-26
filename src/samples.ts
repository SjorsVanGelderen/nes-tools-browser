import
  { List
  } from "immutable"

import
  { Point
  , Dimensions
  } from "./utils/utils"

import
  { frustumSize
  , aspectRatio
  } from "./screen"

import
  { PaletteColor
  , fullPalette
  } from "./palette"

export type Sample = List<number>

export type SamplesState =
  { samples:    List<Sample>
  , background: number
  }

export const samplesStateZero: SamplesState =
  { samples: List<Sample>(
      [ List([ 0,  1,  2 ])
      , List([ 3,  4,  5 ])
      , List([ 6,  7,  8 ])
      , List([ 9, 10, 11 ])
      ]
    )
  , background: 0
  }

export const samplesPosition: Point =
  { x: 0 //frustumSize / 2 + frustumSize / 8
  , y: 0
  }

export const samplesDimensions: Dimensions =
  { w: frustumSize / 16 * 10
  , h: frustumSize / 16
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
      p.flatMap(c => c != undefined
        ? List([ c.r, c.g, c.b ])
        : List<number>()
      ).toList()
    
    return result
  })
  .concat(List([ b.r, b.g, b.b ]))
  .toList()
}