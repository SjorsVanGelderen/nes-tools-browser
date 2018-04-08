import
  { Option
  , readTextFile
  } from "../../utils"

export async function characterVert(): Promise<Option<string>> {
  const result = await readTextFile("/dist/Shaders/character.vert")
  return result
}

export async function characterFrag(): Promise<Option<string>> {
  const result = await readTextFile("/dist/Shaders/character.frag")
  return result
}