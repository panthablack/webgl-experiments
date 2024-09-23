export const getContextOrAlert = (canvas: HTMLCanvasElement): WebGLRenderingContext => {
  const context = canvas.getContext('webgl')
  if (!context) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.')
    throw 'Cannot initialise WebGL - get context failed.'
  }
  return context
}

export const resetRenderingContext = (context: WebGLRenderingContext): WebGLRenderingContext => {
  context.clearColor(0.0, 0.0, 0.0, 1.0) // Clear to black, fully opaque
  context.clearDepth(1.0) // Clear everything
  context.enable(context.DEPTH_TEST) // Enable depth testing
  context.depthFunc(context.LEQUAL) // Near things obscure far things
  context.clear(context.COLOR_BUFFER_BIT | context.DEPTH_BUFFER_BIT) // Clear the canvas before we start drawing on it.

  return context
}
