export const characterVert: string = `
varying vec2 uvPosition;

void main()
{
  uvPosition = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const characterFrag: string = `
uniform sampler2D texture;
uniform vec2 mousePosition;

varying vec2 uvPosition;

void main()
{
  float s = 128.0;

  float hPart  = 1.0 / s;
  float left   = floor(mousePosition.x / hPart) * hPart;
  float right  = left + hPart;

  float vPart  = 1.0 / s;
  float bottom = ceil(mousePosition.y / vPart) * vPart;
  float top    = bottom - vPart;

  gl_FragColor = uvPosition.x >= left
              && uvPosition.x <  right
              && uvPosition.y >= top
              && uvPosition.y <  bottom
    ? texture2D(texture, uvPosition)
    : vec4(texture2D(texture, uvPosition).xyz * 0.2, 1.0);
}
`