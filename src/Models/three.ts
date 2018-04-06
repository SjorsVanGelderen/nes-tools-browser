import
  { Map
  } from "immutable"

import
  { Scene
  , OrthographicCamera
  , WebGLRenderer
  , Mesh
  , ShaderMaterial
  } from "three"

export type ThreeState =
  { scene    : Scene
  , camera   : OrthographicCamera
  , renderer : WebGLRenderer
  , meshes   : Map<string, Mesh>
  , shaders  : Map<string, ShaderMaterial>
  }