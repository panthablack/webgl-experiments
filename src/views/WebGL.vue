<template>
  <PageContainer class="webGLPageContainer">
    <PageHeading>WebGL</PageHeading>
    <WebGLCanvas @canvas-mounted="launchEmptyWebGL($event)" />
  </PageContainer>
</template>

<script setup lang="ts">
import { launchEmptyWebGL } from '@/utilities/webgl/empty'
import PageContainer from '@/components/pages/PageContainer.vue'
import PageHeading from '@/components/pages/PageHeading.vue'
import WebGLCanvas from '@/components/webgl/WebGLCanvas.vue'
</script>