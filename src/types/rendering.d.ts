export type AnimationOptions = {
  axis: [number, number, number]
  rotation: number
}

export type ProgramInfo = {
  program: WebGLProgram
  attribLocations: {
    vertexPosition: GLint
  }
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation
    modelViewMatrix: WebGLUniformLocation
  }
}
