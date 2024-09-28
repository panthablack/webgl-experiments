import { DEFAULT_ANIMATION_OPTIONS } from '@/config/constants/webgl'
import type { AnimationOptions } from '@/types/rendering'
import type { CanvasID } from '@/types/webgl'
import { getCanvasFromId } from '@/utilities/canvas'
import { getContextOrAlert, resetRenderingContext } from '@/utilities/webgl/context'
import {
  drawColouredRectangle,
  drawCustomRectangle,
  drawRectangle,
} from '@/utilities/webgl/rendering'
import { ref, toValue, type Ref } from 'vue'

export interface UseWebGLInterface {
  canvas: Ref<HTMLCanvasElement>
  context: Ref<WebGLRenderingContext>
  loadAnimatedPlane: Function
  loadBlankPlane: Function
  loadColouredPlane: Function
  loadCustomShaderPlane: Function
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
  const loadAnimatedPlane = (animationOptions?: AnimationOptions) =>
    drawCustomRectangle(context.value, {
      ...DEFAULT_ANIMATION_OPTIONS,
      ...(animationOptions || {}),
    })

  const loadBlankPlane = () => {
    drawRectangle(context.value)
  }

  const loadColouredPlane = () => {
    drawColouredRectangle(context.value)
  }

  const loadCustomShaderPlane = () => {
    drawCustomRectangle(context.value)
  }

  // return interface
  return {
    canvas,
    context,
    loadAnimatedPlane,
    loadBlankPlane,
    loadColouredPlane,
    loadCustomShaderPlane,
  }
}
