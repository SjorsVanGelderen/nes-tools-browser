export const surfaceVert: string = `
varying vec2 vUv;

void main()
{
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const surfaceFrag: string = `
uniform sampler2D texture;

varying vec2 vUv;

void main()
{
  gl_FragColor = texture2D(texture, vUv);
}
`