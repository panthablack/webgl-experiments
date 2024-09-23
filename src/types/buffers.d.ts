export type BufferValue = ColorBufferValue | PositionBufferValue

export type ColorBufferValue = number

export type PositionBufferValue = number

export type WebGLBufferCollection = {
  color?: WebGLBuffer | null
  position?: WebGLBuffer | null
}

export type WebGLBufferCollectionOptions = {
  colors?: number[]
  positions?: number[]
}
