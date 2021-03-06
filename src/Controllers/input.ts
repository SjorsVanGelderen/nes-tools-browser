import
  { Option
  , Point
  , emptyOpt
  , makeOpt
  , run
  } from "../utils"

import
  { screenWidth
  , screenHeight
  } from "../screen"

import
  { State
  } from "../Models/state"

import
  { InputState
  , MouseState
  , KeyboardState
  } from "../Models/input"

// Buffers for side-effects
export let mousePosition : Point          = { x: 0, y: 0 }
export let mouseClick    : Option<Point>  = emptyOpt()
export let keyPress      : Option<number> = emptyOpt()

const mouseStateZero: () => MouseState = () => (
  { position : { x: 0, y: 0 }
  , click    : emptyOpt()
  }
)

const keyboardStateZero: () => KeyboardState = () => (
  { press : emptyOpt()
  }
)

export const inputStateZero: () => InputState = () => (
  { mouse    : mouseStateZero()
  , keyboard : keyboardStateZero()
  }
)

export const click: (p: Option<Point>) => (m: MouseState) => MouseState =
  (p: Option<Point>) => (m: MouseState) => ({ ...m, click: p })

export const move: (p: Point) => (m: MouseState) => MouseState =
  (p: Point) => (m: MouseState) => ({ ...m, position: p})

export const press: (c: Option<number>) => (k: KeyboardState) => KeyboardState =
  (c: Option<number>) => (k: KeyboardState) => ({ ...k, press: c })

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

export const onScroll: (e: MouseEvent) => void = (e: MouseEvent) => {
  
}

export const onKeyPress: (e: KeyboardEvent) => void = (e: KeyboardEvent) => {
  if(e != undefined) {
    keyPress = makeOpt(e.keyCode)
  }
}

export const flush: () => void = () => {
  mouseClick = emptyOpt<Point>()
  keyPress   = emptyOpt()
}

const updateMouse: (s: MouseState) => MouseState = (s: MouseState) =>
  run(move(mousePosition))(click(mouseClick))("with")(s)

const updateKeyboard: (s: KeyboardState) => KeyboardState = (s: KeyboardState) =>
  run(press(keyPress))("with")(s)

export const updateInput: (s: State) => State = (s: State) => {
  const i: InputState = s.input

  const newState: State =
    { ...s
    , input:
      { ...i
      , mouse    : updateMouse(i.mouse)
      , keyboard : updateKeyboard(i.keyboard)
      }
    }

  return newState
}