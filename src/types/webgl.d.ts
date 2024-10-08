import type { ComputedRef, Ref } from 'vue'

export type CanvasID = string | Ref<string> | ComputedRef<string>

export type ProgramInfo = {
  program: WebGLProgram
  attribLocations: {
    vertexPosition: GLint
    vertexColor?: GLint
  }
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation
    modelViewMatrix: WebGLUniformLocation
  }
}
