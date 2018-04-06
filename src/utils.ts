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