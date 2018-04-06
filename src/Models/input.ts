import
  { Option
  , Point
  } from "../utils"

export type MouseState =
  { position : Point
  , click    : Option<Point>
  }

export type KeyboardState =
  { press : Option<number>
  }

export type InputState =
  { mouse    : MouseState
  , keyboard : KeyboardState
  }