<template>
  <PageContainer class="webGLBlankPlanePageContainer">
    <PageHeading>WebGL Blank Plane</PageHeading>
    <WebGLCanvas @canvas-mounted="launchBlankPlaneWebGL($event)" />
  </PageContainer>
</template>

<script setup lang="ts">
import PageContainer from '@/components/pages/PageContainer.vue'
import PageHeading from '@/components/pages/PageHeading.vue'
import WebGLCanvas from '@/components/webgl/WebGLCanvas.vue'
import { launchBlankPlaneWebGL } from '@/utilities/webgl/renderBlankPlane'
</script>