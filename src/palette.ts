import
  { List
  , Range
  } from "immutable"

import
  { Point
  , pointZero
  , Dimensions
  } from "./utils/utils"

import
  { frustumSize
  , aspectRatio
  } from "./screen"

export type PaletteColor = { r: number, g: number, b: number }
export type Palette      = List<PaletteColor>

export const fullPalette: Palette = List<PaletteColor>(
  [ { r: 101, g: 101, b: 101 }
  , { r: 176, g: 176, b: 176 }
  , { r: 254, g: 254, b: 255 }
  , { r: 254, g: 254, b: 255 }

  , { r:   3, g:  47, b: 103 }
  , { r:  15, g:  99, b: 179 }
  , { r:  93, g: 179, b: 255 }
  , { r: 188, g: 223, b: 255 }

  , { r:  21, g:  35, b: 125 }
  , { r:  64, g:  81, b: 208 }
  , { r: 143, g: 161, b: 255 }
  , { r: 209, g: 216, b: 255 }

  , { r:  60, g:  26, b: 122 }
  , { r: 120, g:  65, b: 204 }
  , { r: 200, g: 144, b: 255 }
  , { r: 232, g: 209, b: 255 }

  , { r:  95, g:  18, b:  97 }
  , { r: 167, g:  54, b: 169 }
  , { r: 247, g: 133, b: 250 }
  , { r: 251, g: 205, b: 253 }

  , { r: 114, g:  14, b:  55 }
  , { r: 192, g:  52, b: 112 }
  , { r: 255, g: 131, b: 192 }
  , { r: 255, g: 204, b: 229 }

  , { r: 112, g:  16, b:  13 }
  , { r: 189, g:  60, b:  48 }
  , { r: 255, g: 138, b: 127 }
  , { r: 255, g: 207, b: 202 }

  , { r:  89, g:  26, b:   5 }
  , { r: 159, g:  74, b:   0 }
  , { r: 239, g: 154, b:  73 }
  , { r: 248, g: 213, b: 180 }

  , { r:  52, g:  40, b:   3 }
  , { r: 109, g:  92, b:   0 }
  , { r: 189, g: 172, b:  44 }
  , { r: 228, g: 220, b: 168 }

  , { r:  13, g:  51, b:   3 }
  , { r:  54, g: 109, b:   0 }
  , { r: 133, g: 188, b:  47 }
  , { r: 204, g: 227, b: 169 }

  , { r:   3, g:  59, b:   4 }
  , { r:   7, g: 119, b:   4 }
  , { r:  85, g: 199, b:  83 }
  , { r: 185, g: 232, b: 184 }

  , { r:   4, g:  60, b:  19 }
  , { r:   0, g: 121, b:  61 }
  , { r:  60, g: 201, b: 140 }
  , { r: 174, g: 232, b: 208 }

  , { r:   3, g:  56, b:  63 }
  , { r:   0, g: 114, b: 125 }
  , { r:  62, g: 194, b: 205 }
  , { r: 175, g: 229, b: 234 }

  , { r:   0, g:   0, b:   0 }
  , { r:   0, g:   0, b:   0 }
  , { r:  78, g:  78, b:  78 }
  , { r: 182, g: 182, b: 182 }

  , { r:   0, g:   0, b:   0 }
  , { r:   0, g:   0, b:   0 }
  , { r:   0, g:   0, b:   0 }
  , { r:   0, g:   0, b:   0 }

  , { r:   0, g:   0, b:   0 }
  , { r:   0, g:   0, b:   0 }
  , { r:   0, g:   0, b:   0 }
  , { r:   0, g:   0, b:   0 }
  ]
)

export type PaletteState =
  { position:   Point
  , background: number
  }

export const paletteDimensions: Dimensions =
  { w: frustumSize / 4
  , h: frustumSize
  }

export const palettePosition: Point =
  { x: (frustumSize * aspectRatio) / 2 - paletteDimensions.w / 2
  , y: 0
  }

export const paletteStateZero: PaletteState = 
  { position:   palettePosition
  , background: 64
  }

export const paletteData: List<number> =
  Range(0, 64).flatMap((_, i) => {
    if(i == undefined) return List<number>()

    const p: PaletteColor = fullPalette.get(i)
    return List([ p.r, p.g, p.b ])
  }
).toList()