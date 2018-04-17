uniform sampler2D texture;
uniform vec2      mousePosition;
uniform int       activeSample;

varying vec2 uvPosition;

const float hPart  = 1.0;
const float vPart  = 1.0 / 10.0;
const float bSize  = 0.1;
const vec4  bColor = vec4(1.0, 1.0, 0.0, 1.0);
const vec4  aColor = vec4(1.0, 0.0, 1.0, 1.0);

void main()
{
  float left   = floor(mousePosition.x);
  float right  = left + hPart;
  float bottom = ceil(mousePosition.y / vPart) * vPart;
  float top    = bottom - vPart;

  bool onHover =  uvPosition.x >= left
               && uvPosition.x <  right
               && uvPosition.y >= top
               && uvPosition.y <  bottom;

  bool onBorder =  uvPosition.x - left         < bSize * hPart
                || right        - uvPosition.x < bSize * hPart
                || uvPosition.y - top          < bSize * vPart
                || bottom       - uvPosition.y < bSize * vPart;

  bool onActive = int(floor(uvPosition.y / vPart)) == activeSample;

  vec4 tColor = texture2D(texture, uvPosition);

  gl_FragColor =
    onBorder 
    ? onHover
      ? bColor
      : onActive
        ? aColor
        : tColor
    : tColor;
}