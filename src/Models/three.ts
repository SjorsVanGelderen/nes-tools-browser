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

import
  { Option
  } from "../utils"

export type ThreeState =
  { scene    : Scene
  , camera   : OrthographicCamera
  , renderer : WebGLRenderer
  , meshes   : Map<string, Option<Mesh>>
  // , shaders  : Map<string, ShaderMaterial>
  }