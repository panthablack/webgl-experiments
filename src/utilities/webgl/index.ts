import type { WebGLBufferCollection, WebGLBufferCollectionOptions } from '@/types/buffers'

export const createBuffers = (
  context: WebGLRenderingContext,
  options: WebGLBufferCollectionOptions
): WebGLBufferCollection => {
  const buffers: WebGLBufferCollection = {}
  const { positions, colors } = options
  if (positions) buffers.position = createPositionBuffer(context, positions)
  if (colors) buffers.color = createColorBuffer(context, colors)
  return buffers
}

export const createPositionBuffer = (
  context: WebGLRenderingContext,
  positions: number[]
): WebGLBuffer | null => {
  const buffer = context.createBuffer()
  context.bindBuffer(context.ARRAY_BUFFER, buffer)
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(positions), context.STATIC_DRAW)
  return buffer
}

export const createColorBuffer = (
  context: WebGLRenderingContext,
  positions: number[]
): WebGLBuffer | null => {
  const buffer = context.createBuffer()
  context.bindBuffer(context.ARRAY_BUFFER, buffer)
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(positions), context.STATIC_DRAW)
  return buffer
}
