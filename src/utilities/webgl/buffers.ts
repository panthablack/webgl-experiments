import type { WebGLBufferCollection } from '@/types/buffers'

export const createBuffers = (context: WebGLRenderingContext): WebGLBufferCollection => {
  const positionBuffer: WebGLBuffer | null = initPositionBuffer(context)
  if (!positionBuffer) throw 'no position buffer'
  const colorBuffer: WebGLBuffer | null = initColorBuffer(context)
  if (!colorBuffer) throw 'no position buffer'
  return {
    position: positionBuffer,
    color: colorBuffer,
  }
}

export const initPositionBuffer = (context: WebGLRenderingContext): WebGLBuffer => {
  // Create a buffer for the square's positions.
  const positionBuffer = context.createBuffer()
  if (!positionBuffer) throw 'no buffer'

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.
  context.bindBuffer(context.ARRAY_BUFFER, positionBuffer)

  // Now create an array of positions for the square.
  const positions = [1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(positions), context.STATIC_DRAW)

  return positionBuffer
}

export const initColorBuffer = (context: WebGLRenderingContext): WebGLBuffer => {
  const colors = [
    ...[1.0, 1.0, 1.0, 1.0], // white
    ...[1.0, 0.0, 0.0, 1.0], // red
    ...[0.0, 1.0, 0.0, 1.0], // green
    ...[0.0, 0.0, 1.0, 1.0], // blue
  ]

  const colorBuffer = context.createBuffer()
  if (!colorBuffer) throw 'no buffer'
  context.bindBuffer(context.ARRAY_BUFFER, colorBuffer)
  context.bufferData(context.ARRAY_BUFFER, new Float32Array(colors), context.STATIC_DRAW)

  return colorBuffer
}
