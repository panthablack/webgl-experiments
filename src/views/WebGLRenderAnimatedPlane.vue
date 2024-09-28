<template>
  <PageContainer class="webGLCustomShaderPageContainer">
    <PageHeading>WebGL Custom Shader</PageHeading>
    <WebGLCanvas
      @canvas-mounted="onCanvasMounted"
      :canvas-i-d="canvasID"
    />
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/pages/PageContainer.vue'
import PageHeading from '@/components/pages/PageHeading.vue'
import WebGLCanvas from '@/components/webgl/WebGLCanvas.vue'
import { useWebGL, type UseWebGLInterface } from '@/composables/useWebGL'
import type { CanvasID } from '@/types/webgl'

const canvasID: CanvasID = 'webGLCanvas'
const onCanvasMounted = async () => {
  const webGLInterface: UseWebGLInterface = useWebGL(canvasID)

  let before: number = (0)
  let delta: number = (0)
  let rotation: number = (0)
  let axis = [1, 1, 0.5]
  let speed = 2
  let accelleration = 1.003
  let maxSpeed = 5

  function render(now: number) {
    now *= 0.001 // convert to seconds
    if (speed <= maxSpeed) speed *= (accelleration)
    now *= speed
    delta = now - before
    before = now
    webGLInterface.loadAnimatedPlane({ rotation, axis })
    rotation += delta
    requestAnimationFrame(render)
  }
  requestAnimationFrame(render)
}
</script>