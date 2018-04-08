varying vec2 uvPosition;

void main()
{
  uvPosition = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}