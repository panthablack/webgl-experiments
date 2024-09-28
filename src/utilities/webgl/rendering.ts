import type { ProgramInfo } from '@/types/webgl'
import type { WebGLBufferCollection } from '@/types/buffers'
import {
  fragmentShaderColoured,
  fragmentShaderCustom,
  fragmentShaderDefault,
  vertexShaderColoured,
  vertexShaderCustom,
  vertexShaderDefault,
} from '@/utilities/shaders'
import { createBuffers } from '@/utilities/webgl/buffers'
import { loadShaderProgram } from '@/utilities/webgl/shaders'
import { getAspectRatio } from '@/utilities/canvas'
import {
  createMat4,
  createPerspectiveMatrix,
  rotateMatrix,
  translateMatrix,
  type Mat4,
} from '@/utilities/glMatrix/mat4'
import { resetRenderingContext } from '@/utilities/webgl/context'
import { getProgramInfo } from '@/utilities/webgl/programs'
import { setColorAttribute, setPositionAttribute } from '@/utilities/webgl/attributes'
import type { AnimationOptions } from '@/types/rendering'

export const drawRectangle = (
  context: WebGLRenderingContext,
  animationOptions?: AnimationOptions
): WebGLRenderingContext => {
  const shaderProgram = loadShaderProgram(context, vertexShaderDefault, fragmentShaderDefault)
  const programInfo: ProgramInfo = getProgramInfo(context, shaderProgram)
  const buffers = createBuffers(context, {
    positions: [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0],
  })
  drawScene(context, programInfo, buffers, animationOptions)
  return context
}

export const drawColouredRectangle = (
  context: WebGLRenderingContext,
  animationOptions?: AnimationOptions
): WebGLRenderingContext => {
  const shaderProgram = loadShaderProgram(context, vertexShaderColoured, fragmentShaderColoured)
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
  drawScene(context, programInfo, buffers, animationOptions)
  return context
}

export const drawCustomRectangle = (
  context: WebGLRenderingContext,
  animationOptions?: AnimationOptions
): WebGLRenderingContext => {
  const shaderProgram = loadShaderProgram(context, vertexShaderCustom, fragmentShaderCustom)
  const programInfo: ProgramInfo = getProgramInfo(context, shaderProgram)
  const buffers = createBuffers(context, {
    positions: [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0],
  })
  drawScene(context, programInfo, buffers, animationOptions)
  return context
}

const drawScene = (
  context: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: WebGLBufferCollection,
  animationOptions?: AnimationOptions
) => {
  resetRenderingContext(context)
  const projectionMatrix = getProjectionMatrix(context)
  const modelViewMatrix = getModelViewMatrix()
  if (animationOptions !== undefined)
    rotateMatrix(modelViewMatrix, modelViewMatrix, animationOptions.rotation, animationOptions.axis)
  if (buffers.color) setColorAttribute(context, programInfo, buffers)
  setPositionAttribute(context, programInfo, buffers)
  context.useProgram(programInfo.program)
  context.uniformMatrix4fv(programInfo.uniformLocations.projectionMatrix, false, projectionMatrix)
  context.uniformMatrix4fv(programInfo.uniformLocations.modelViewMatrix, false, modelViewMatrix)
  const offset = 0
  const vertexCount = 4
  context.drawArrays(context.TRIANGLE_STRIP, offset, vertexCount)
}

export const getModelViewMatrix = (): Mat4 => {
  const modelViewMatrix = createMat4()
  translateMatrix(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0])
  return modelViewMatrix
}

export const getProjectionMatrix = (context: WebGLRenderingContext): Mat4 => {
  const fieldOfView = (45 * Math.PI) / 180 // in radians
  const aspect = getAspectRatio(context.canvas as HTMLCanvasElement)
  const zNear = 0.1
  const zFar = 100.0
  const projectionMatrix: Mat4 = createMat4()
  createPerspectiveMatrix(projectionMatrix, fieldOfView, aspect, zNear, zFar)
  return projectionMatrix
}
