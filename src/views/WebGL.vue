<template>
  <PageContainer class="webGLPageContainer">
    <PageHeading>WebGL</PageHeading>
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
import { ref, type Ref } from 'vue'

const canvasID: CanvasID = 'webGLCanvas'
const webGLInterface: Ref<UseWebGLInterface | null> = ref(null)
const onCanvasMounted = async () => {
  webGLInterface.value = useWebGL(canvasID)
}
</script>