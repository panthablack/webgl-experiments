import type { SetAttributeOptions } from '@/types/attributes'
import type { WebGLBufferCollection } from '@/types/buffers'
import type { ProgramInfo } from '@/types/webgl'

export const setVertexAttribute = (
  context: WebGLRenderingContext,
  buffer: WebGLBuffer,
  pointer: GLint,
  options: SetAttributeOptions
): void => {
  context.bindBuffer(context.ARRAY_BUFFER, buffer)
  context.vertexAttribPointer(
    pointer, // vertex pointer
    options?.numComponents || 2, // number of components
    options?.type || context.FLOAT, // type
    options?.normalize || false, // normalize
    options?.stride || 0, // stride
    options?.offset || 0 // offset
  )
  context.enableVertexAttribArray(pointer)
}

export const setColorAttribute = (
  context: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: WebGLBufferCollection,
  options?: SetAttributeOptions
): void => {
  const vCol = programInfo.attribLocations.vertexColor
  if (!(vCol || vCol === 0) || !buffers.color) throw 'cannot set color attribute'
  setVertexAttribute(context, buffers.color, vCol, { ...options, numComponents: 4 })
}

export const setPositionAttribute = (
  context: WebGLRenderingContext,
  programInfo: ProgramInfo,
  buffers: WebGLBufferCollection,
  options?: SetAttributeOptions
): void => {
  const vPos = programInfo.attribLocations.vertexPosition
  if (!(vPos || vPos === 0) || !buffers.position) throw 'cannot set position attribute'
  setVertexAttribute(context, buffers.position, vPos, { ...options, numComponents: 2 })
}
