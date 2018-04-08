import
  { Option
  , readTextFile
  } from "../../utils"

export async function paletteVert(): Promise<Option<string>> {
  const result = await readTextFile("/dist/Shaders/palette.vert")
  return result
}

export async function paletteFrag(): Promise<Option<string>> {
  const result = await readTextFile("/dist/Shaders/palette.frag")
  return result
}