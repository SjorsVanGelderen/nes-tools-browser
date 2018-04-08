import
  { Option
  , readTextFile
  } from "../../utils"

export async function samplesVert(): Promise<Option<string>> {
  const result = await readTextFile("Shaders/samples.vert")
  return result
}

export async function samplesFrag(): Promise<Option<string>> {
  const result = await readTextFile("Shaders/samples.frag")
  return result
}