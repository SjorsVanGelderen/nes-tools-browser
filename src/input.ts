import
  { Option
  , emptyOpt
  , makeOpt
  , Point
  } from "./utils/utils"

import
  { screenWidth
  , screenHeight
  } from "./screen"

type MouseState =
  { position: Point
  , click:    Option<Point>
  }

export const mouseStateZero: () => MouseState = () => (
  { position: { x: 0, y: 0 }
  , click:    emptyOpt()
  }
)

export type InputState =
  { mouse: MouseState
  }

export const inputStateZero: () => InputState = () => (
  { mouse: mouseStateZero()
  }
)

export const click: (p: Option<Point>) => (i: InputState) => InputState =
  (p: Option<Point>) => (i: InputState) => (
    { ...i, click: p }
  )

export const move: (p: Point) => (i: InputState) => InputState =
  (p: Point) => (i: InputState) => (
    { ...i, position: p }
  )

export let mousePosition: Point = { x: 0, y: 0 }
export let mouseClick:    Option<Point>

export const convertPosition: (p: Point) => Point = (p: Point) => {
  const widthRatio  = window.innerWidth  / p.x
  const heightRatio = window.innerHeight / p.y

  const x = screenWidth  / widthRatio  - screenWidth  / 2
  const y = screenHeight / heightRatio - screenHeight / 2

  return { x: x, y: y }
}

export const onMove: (e: MouseEvent) => void = (e: MouseEvent) => {
  if(e != undefined) {
    mousePosition = convertPosition({ x: e.x, y: e.y })
  }
}

export const onClick: (e: MouseEvent) => void = (e: MouseEvent) => {
  if(e != undefined) {
    mouseClick = makeOpt(convertPosition({ x: e.x, y: e.y }))
  }
}