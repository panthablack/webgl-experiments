import type { ProgramInfo } from '@/types/webgl'

export const getProgramInfo = (context: WebGLRenderingContext, prog: WebGLProgram): ProgramInfo => {
  const vertexColor = context.getAttribLocation(prog, 'aVertexColor')
  const vertexPosition = context.getAttribLocation(prog, 'aVertexPosition')
  const projectionMatrix = context.getUniformLocation(prog, 'uProjectionMatrix')
  const modelViewMatrix = context.getUniformLocation(prog, 'uModelViewMatrix')

  if (!((vertexPosition || vertexPosition === 0) && projectionMatrix && modelViewMatrix))
    throw 'Could not get program info'

  return {
    program: prog,
    attribLocations: { vertexColor, vertexPosition },
    uniformLocations: { projectionMatrix, modelViewMatrix },
  }
}
