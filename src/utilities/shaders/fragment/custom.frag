varying lowp vec2 pos;

void main() {
  gl_FragColor = vec4(0.28, 0.78, 0.91, (pos.x + pos.y + 4.) / 7.);
}