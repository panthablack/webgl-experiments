import type { ProgramInfo } from '@/types/webgl'
import type { WebGLBufferCollection } from '@/types/buffers'
import { fragmentShaderDefault, vertexShaderDefault } from '@/utilities/shaders'
import { createBuffers } from '@/utilities/webgl/buffers'
import { loadShaderProgram } from '@/utilities/webgl/shaders'
import { getAspectRatio } from '../canvas'
import { createMat4, createPerspectiveMatrix, translateMatrix, type Mat4 } from '../glMatrix/mat4'
import { resetRenderingContext } from './context'

export const drawRectangle = (context: WebGLRenderingContext): WebGLRenderingContext => {
  const shaderProgram = loadShaderProgram(context, vertexShaderDefault, fragmentShaderDefault)

  const programInfo: ProgramInfo = getProgramInfo(context, shaderProgram)
  const buffers = createBuffers(context, {
    positions: [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0],
  })

  drawScene(context, programInfo, buffers)

  return context
}

export const drawColouredRectangle = (context: WebGLRenderingContext): WebGLRenderingContext => {
  const shaderProgram = loadShaderProgram(context, vertexShaderDefault, fragmentShaderDefault)

  const programInfo: ProgramInfo = getProgramInfo(context, shaderProgram)
  const buffers = createBuffers(context, {
    positions: [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0],
    colors: [
      ...[1.0, 1.0, 1.0, 1.0], // white
      ...[1.0, 0.0, 0.0, 1.0], // red
      ...[0.0, 1.0, 0.0, 1.0], // green
      ...[0.0, 0.0, 1.0, 1.0], // blue
    ],
  })

  drawScene(context, programInfo, buffers)

  return context
}

const drawScene = (
  context: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: WebGLBufferCollection
) => {
  resetRenderingContext(context)
  const projectionMatrix = getProjectionMatrix(context)
  const modelViewMatrix = getModelViewMatrix()

  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  setPositionAttribute(context, programInfo, buffers)

  // Tell WebGL to use our program when drawing
  context.useProgram(programInfo.program)

  // Set the shader uniforms
  context.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix)
  context.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)
  const offset = 0
  const vertexCount = 4
  context.drawArrays(context.TRIANGLE_STRIP, offset, vertexCount)
}

export const getModelViewMatrix = (): Mat4 => {
  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const modelViewMatrix = createMat4()

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  translateMatrix(
    modelViewMatrix, // destination matrix
    modelViewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0]
  ) // amount to translate

  return modelViewMatrix
}

export const getProjectionMatrix = (context: WebGLRenderingContext): Mat4 => {
  /***
    Create a perspective matrix, a special matrix that is
    used to simulate the distortion of perspective in a camera.
    Our field of view is 45 degrees, with a width/height
    ratio that matches the display size of the canvas
    and we only want to see objects between 0.1 units
    and 100 units away from the camera.
   */

  const fieldOfView = (45 * Math.PI) / 180 // in radians
  const aspect = getAspectRatio(context.canvas as HTMLCanvasElement)
  const zNear = 0.1
  const zFar = 100.0
  const projectionMatrix: Mat4 = createMat4()

  // note: contextmatrix.js always has the first argument
  // as the destination to receive the result.
  createPerspectiveMatrix(projectionMatrix, fieldOfView, aspect, zNear, zFar)

  return projectionMatrix
}

export const getProgramInfo = (context: WebGLRenderingContext, prog: WebGLProgram): ProgramInfo => {
  const vertexPosition = context.getAttribLocation(prog, 'aVertexPosition')
  const projectionMatrix = context.getUniformLocation(prog, 'uProjectionMatrix')
  const modelViewMatrix = context.getUniformLocation(prog, 'uModelViewMatrix')

  if (!((vertexPosition || vertexPosition === 0) && projectionMatrix && modelViewMatrix))
    throw 'Could not get program info'

  return {
    program: prog,
    attribLocations: { vertexPosition },
    uniformLocations: { projectionMatrix, modelViewMatrix },
  }
}

// Tell WebGL how to pull out the positions from the position
// buffer into the vertexPosition attribute.
export const setPositionAttribute = (
  context: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: WebGLBufferCollection
) => {
  const numComponents = 2 // pull out 2 values per iteration
  const type = context.FLOAT // the data in the buffer is 32bit floats
  const normalize = false // don't normalize
  const stride = 0 // how many bytes to get from one set of values to the next
  // 0 = use type and numComponents above
  const offset = 0 // how many bytes inside the buffer to start from
  if (buffers.position) {
    context.bindBuffer(context.ARRAY_BUFFER, buffers.position)
  }
  context.vertexAttribPointer(
    programInfo.attribLocations.vertexPosition,
    numComponents,
    type,
    normalize,
    stride,
    offset
  )
  context.enableVertexAttribArray(programInfo.attribLocations.vertexPosition)
}
