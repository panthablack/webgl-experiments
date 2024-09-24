<template>
  <PageContainer class="webGLColouredPlanePageContainer">
    <PageHeading>WebGL Coloured Plane</PageHeading>
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
  webGLInterface.loadCustomShaderPlane()
}
</script>