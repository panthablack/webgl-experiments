attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;

uniform mat4 uProjectionMatrix;

varying lowp vec2 pos;

void main() {
  gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  pos = gl_Position.xy;
}