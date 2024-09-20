import type { BuffersCollection, ProgramInfo } from '@/types/webgl'
import { fragmentShaderDefault, vertexShaderDefault } from '@/utilities/shaders'
import { drawScene } from '@/utilities/webgl/drawScene'
import { initBuffers } from '@/utilities/webgl/initBuffers'

export const initShaderProgram = (
  gl: WebGLRenderingContext,
  vertexShaderDefault: string,
  fragmentShaderDefault: string
): WebGLProgram => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderDefault)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderDefault)

  // Create the shader program
  const shaderProgram = gl.createProgram()
  if (!shaderProgram) throw 'no shader program'
  if (!vertexShader) throw 'no vertex shader'
  if (!fragmentShader) throw 'no fragment shader'
  gl.attachShader(shaderProgram, vertexShader)
  gl.attachShader(shaderProgram, fragmentShader)
  gl.linkProgram(shaderProgram)

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS))
    throw `Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`

  return shaderProgram
}

export const loadShader = (gl: WebGLRenderingContext, type: GLenum, source: string) => {
  const shader = gl.createShader(type)

  // Send the source to the shader object
  if (!shader) throw 'no shader'
  gl.shaderSource(shader, source)

  // Compile the shader program
  gl.compileShader(shader)

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`)
    gl.deleteShader(shader)
    return null
  }

  return shader
}

export const launchBlankPlaneWebGL = (canvas: HTMLCanvasElement) => {
  // Initialize the GL context
  const gl = canvas?.getContext('webgl')

  // Only continue if WebGL is available and working
  if (gl === null) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.')
    return
  }

  // Set clear color to black, fully opaque
  gl.clearColor(0.0, 0.0, 0.0, 1.0)
  // Clear the color buffer with specified clear color
  gl.clear(gl.COLOR_BUFFER_BIT)

  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vertexShaderDefault, fragmentShaderDefault)

  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.
  const projectionMatrix = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix')
  const modelViewMatrix = gl.getUniformLocation(shaderProgram, 'uModelViewMatrix')
  if (!projectionMatrix || !modelViewMatrix) throw 'matrices missing'
  const programInfo: ProgramInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
    },
    uniformLocations: { projectionMatrix, modelViewMatrix },
  }

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  const buffers: BuffersCollection = initBuffers(gl)

  // Draw the scene
  drawScene(gl, programInfo, buffers)
}
