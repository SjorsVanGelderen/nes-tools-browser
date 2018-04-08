import
  { Option
  , readTextFile
  } from "../../utils"

export async function surfaceVert(): Promise<Option<string>> {
  const result = await readTextFile("Shaders/surface.vert")
  return result
}

export async function surfaceFrag(): Promise<Option<string>> {
  const result = await readTextFile("Shaders/surface.frag")
  return result
}