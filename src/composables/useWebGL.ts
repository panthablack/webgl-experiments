import type { CanvasID } from '@/types/webgl'
import { getCanvasFromId } from '@/utilities/canvas'
import { getContextOrAlert, resetRenderingContext } from '@/utilities/webgl/context'
import { drawColouredRectangle, drawRectangle } from '@/utilities/webgl/rendering'
import { ref, toValue, type Ref } from 'vue'

export interface UseWebGLInterface {
  canvas: Ref<HTMLCanvasElement>
  context: Ref<WebGLRenderingContext>
  loadBlankPlane: Function
  loadColouredPlane: Function
}

export const useWebGL = (canvasID: CanvasID): UseWebGLInterface => {
  // make sure canvasID is a static value and not a ref
  const canvasIDVal: string = toValue(canvasID)

  // store context and canvas in refs
  const canvas: Ref<HTMLCanvasElement> = ref(getCanvasFromId(canvasIDVal))
  const context: Ref<WebGLRenderingContext> = ref(getContextOrAlert(canvas.value))

  // reset context // ***
  resetRenderingContext(context.value)

  // methods
  const loadBlankPlane = () => {
    drawRectangle(context.value)
  }

  const loadColouredPlane = () => {
    drawColouredRectangle(context.value)
  }

  // return interface
  return { canvas, context, loadBlankPlane, loadColouredPlane }
}
