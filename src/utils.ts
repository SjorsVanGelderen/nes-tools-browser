export type Option<A>
  = { kind: "some", value: A }
  | { kind: "none" }

export const emptyOpt: <A>() => Option<A> =
  () => ({ kind: "none" })

export const makeOpt: <A>(x: A) => Option<A> =
  <A>(x: A) => ({ kind: "some", value: x })

export type Point = { x: number, y: number }

export const pointZero: Point = { x: 0, y: 0 }

export type Dimensions = { w: number, h: number }

export const rectContains: (topLeft: Point, d: Dimensions, p: Point) => boolean =
  (topLeft: Point, d: Dimensions, p: Point) =>
       p.x > topLeft.x
    && p.x < topLeft.x + d.w
    && p.y > topLeft.y
    && p.y < topLeft.y + d.h

export type Func<A, B> = (_: A) => B

export const compose: <A, B, C>(f: Func<A, B>, g: Func<B, C>) => Func<A, C> =
  <A, B, C>(f: Func<A, B>, g: Func<B, C>) => (x: A) => g(f(x))

export type Switch<A, B>
  = Func<A, B>
  | "with"

export const run: <A, B>(f: Func<A, B>) => <C>(g: Switch<B, C>) => any =
  <A, B>(f: Func<A, B>) => <C>(g: Switch<B, C>) => g == "with"
      ? f
      : run(compose(f, g))

// Thanks to Shovon Hasan
// https://blog.shovonhasan.com/using-promises-with-filereader/
export async function readTextFile(path: string): Promise<Option<string>> {
  const blob: Promise<Option<Blob>> = fetch(path)
    .then(x => x.blob())
    .then(x => makeOpt(x))
    .catch(x => {
      console.log("Failed to load file")
      return emptyOpt<Blob>()
    })

  const blobResult = await blob

  if(blobResult.kind == "some") {
    const reader: FileReader = new FileReader()

    return new Promise<Option<string>>((resolve, reject) => {
      reader.onerror = () => {
        reader.abort()
        reject(new DOMException(`Error reading $(path)`))
      }

      reader.onload = () => {
        resolve(makeOpt(reader.result))
      }

      reader.readAsText(blobResult.value)
    })
  }
  else {
    return emptyOpt<string>()
  }
}